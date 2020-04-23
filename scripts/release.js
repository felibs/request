const args = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const semver = require("semver");
const currentVersion = require("../package.json").version;
const { prompt } = require("enquirer");
const execa = require("execa");

const preId = "alpha"; // alpha or beta
const isDryRun = args.dry;
const skipTests = args.skipTests;
const skipBuild = args.skipBuild;

const root = path.resolve(__dirname, "../");

const inc = (i) => semver.inc(currentVersion, i, preId);
const bin = (name) => path.resolve(__dirname, "../node_modules/.bin/" + name);
const run = (bin, args, opts = {}) =>
    execa(bin, args, { stdio: "inherit", ...opts });
const dryRun = (bin, args, opts = {}) =>
    console.log(chalk.blue(`[dryrun] ${bin} ${args.join(" ")}`), opts);
const runIfNotDry = isDryRun ? dryRun : run;

const step = (msg) => console.log(chalk.cyan(msg));

const registry = execa.sync("npm", ["config", "get", "registry"]).stdout;
const registries = ['https://registry.npmjs.org', 'https://registry.yarnpkg.com']
if (!registries.some(item => registry.startsWith(item))) {
    throw new Error(`register isn't https://registry.npmjs.org, current register is ${registry}`)
}

// 只在github actions中编译发布
function checkRegister() {
    
    console.log(registry)
    // npm config get registry
    return tagVersion;
}



const versionIncrements = [
    "patch",
    "minor",
    "major",
    "prepatch",
    "preminor",
    "premajor",
    "prerelease",
];

async function main() {
    let targetVersion = args._[0];

    if (!targetVersion) {
        // no explicit version, offer suggestions
        const { release } = await prompt({
            type: "select",
            name: "release",
            message: "Select release type",
            choices: versionIncrements.map((i) => `${i} (${inc(i)})`),
        });
        targetVersion = release.match(/\((.*)\)/)[1];
    }

    if (!semver.valid(targetVersion)) {
        throw new Error(`invalid target version: ${targetVersion}`);
    }

    const { yes } = await prompt({
        type: "confirm",
        name: "yes",
        message: `Releasing v${targetVersion}. Confirm?`,
    });

    if (!yes) {
        return;
    }

    // run tests before release
    step("\nRunning tests...");
    if (!skipTests && !isDryRun) {
        await run(bin("jest"), ["--clearCache"]);
        await run("yarn", ["test", "--runInBand"]);
    } else {
        console.log(`(skipped)`);
    }

    // update all package versions and inter-dependencies
    step("\nUpdating cross dependencies...");

    updateVersions(targetVersion);

    // build all packages with types
    step("\nBuilding all packages...");
    if (!skipBuild && !isDryRun) {
        await run("yarn", ["build", "--release"]);
        // test generated dts files
        // step('\nVerifying type declarations...')
        // await run(bin('tsd'))
    } else {
        console.log(`(skipped)`);
    }

    // generate changelog
    await run(`yarn`, ["changelog"]);

    const { stdout } = await run("git", ["diff"], { stdio: "pipe" });
    if (stdout) {
        step("\nCommitting changes...");
        await runIfNotDry("git", ["add", "-A"]);
        await runIfNotDry("git", [
            "commit",
            "-m",
            `release: v${targetVersion}`,
        ]);
    } else {
        console.log("No changes to commit.");
    }

    // publish packages
    step("\nPublishing packages...");

    await publishPackage(targetVersion, runIfNotDry);

    // push to GitHub
    step("\nPushing to GitHub...");

    await runIfNotDry("git", ["tag", `v${targetVersion}`]);
    await runIfNotDry("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
    await runIfNotDry("git", ["push"]);

    if (isDryRun) {
        console.log(
            `\nDry run finished - run git diff to see package changes.`
        );
    }
    console.log();
}

function updateVersions(version) {
    const pkgPath = path.resolve(root, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.version = version;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

async function publishPackage(version, runIfNotDry) {
    const pkgPath = path.resolve(root, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    if (pkg.private) {
        return;
    }

    step(`Publishing ${pkg.name}...`);
    try {
        await runIfNotDry(
            "yarn",
            ["publish", "--new-version", version, "--access", "public"],
            {
                cwd: root,
                stdio: "pipe",
            }
        );
        console.log(
            chalk.green(`Successfully published ${pkg.name}@${version}`)
        );
    } catch (e) {
        if (e.stderr.match(/previously published/)) {
            console.log(chalk.red(`Skipping already published: ${pkg.name}`));
        } else {
            throw e;
        }
    }
}

main().catch((err) => {
    console.error(err);
});
