/*
yarn build

# specify the format to output
yarn build --formats cjs
```
*/

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");
const args = require("minimist")(process.argv.slice(2));

const formats = args.formats || args.f;
const devOnly = args.devOnly || args.d;
const prodOnly = !devOnly && (args.prodOnly || args.p);
const sourceMap = args.sourcemap || args.s;
const isRelease = args.release;
const buildTypes = args.t || args.types || isRelease;

const commit = execa.sync("git", ["rev-parse", "HEAD"]).stdout.slice(0, 7);

build();

async function build() {
    const pkgDir = path.resolve(__dirname, "../");
    const pkg = require(`${pkgDir}/package.json`);

    // only build published packages for release
    if (isRelease && pkg.private) {
        return;
    }

    // if building a specific format, do not remove dist.
    if (!formats) {
        await fs.remove(`${pkgDir}/dist`);
    }
    const env = devOnly ? "development" : "production";

    await execa(
        "rollup",
        [
            "-c",
            "--environment",
            [
                `COMMIT:${commit}`,
                `NODE_ENV:${env}`,
                formats ? `FORMATS:${formats}` : ``,
                buildTypes ? `TYPES:true` : ``,
                prodOnly ? `PROD_ONLY:true` : ``,
                sourceMap ? `SOURCE_MAP:true` : ``,
            ]
                .filter(Boolean)
                .join(","),
        ],
        { stdio: "inherit" }
    );

    if (buildTypes && pkg.types) {
        console.log();
        console.log(
            chalk.bold(chalk.yellow(`Rolling up type definitions ...`))
        );

        // build types
        const {
            Extractor,
            ExtractorConfig,
        } = require("@microsoft/api-extractor");

        const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`);
        const extractorConfig = ExtractorConfig.loadFileAndPrepare(
            extractorConfigPath
        );
        const result = Extractor.invoke(extractorConfig, {
            localBuild: true,
            showVerboseMessages: true,
        });

        if (result.succeeded) {
            console.log(
                chalk.bold(chalk.green(`API Extractor completed successfully.`))
            );
        } else {
            console.error(
                `API Extractor completed with ${extractorResult.errorCount} errors` +
                    ` and ${extractorResult.warningCount} warnings`
            );
            process.exitCode = 1;
        }
        await fs.remove(`${pkgDir}/dist/lib`);
    }
}
