import path from "path";
import ts from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";

const version = require("./package.json").version;
const globalName = "RequestHooks";

const resolve = (p) => path.resolve(__dirname, p);

const outputConfigs = {
    "esm-bundler": {
        file: resolve(`dist/request.esm-bundler.js`),
        format: `es`,
    },
    cjs: {
        file: resolve(`dist/request.cjs.js`),
        format: `cjs`,
    },
    global: {
        file: resolve(`dist/request.global.js`),
        format: `iife`,
    },
    esm: {
        file: resolve(`dist/request.esm.js`),
        format: `es`,
    },
};

const defaultFormats = ["esm-bundler", "cjs", "global", "esm"];
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(",");
const packageFormats = inlineFormats || defaultFormats;

const packageConfigs = packageFormats.map((format) =>
    createConfig(format, outputConfigs[format])
);

if (process.env.NODE_ENV === "production") {
    packageFormats.forEach((format) => {
        if (format === "cjs") {
            packageConfigs.push(createProductionConfig(format));
        }

        if (/global/.test(format) || format === "esm") {
            packageConfigs.push(createMinifiedConfig(format));
        }
    });
}

export default packageConfigs;

function createConfig(format, output, plugins = []) {
    if (!output) {
        console.log(require("chalk").yellow(`invalid format: "${format}"`));
        process.exit(1);
    }

    output.sourcemap = !!process.env.SOURCE_MAP;
    output.externalLiveBindings = false;

    const isProductionBuild =
        process.env.__DEV__ === "false" || /\.prod\.js$/.test(output.file);
    const isGlobalBuild = /global/.test(format);
    const isRawESMBuild = format === "esm";
    const isNodeBuild = format === "cjs";
    const isBundlerESMBuild = /esm-bundler/.test(format);

    if (isGlobalBuild) {
        output.name = globalName;
        output.globals = {
            axios: "axios",
            vue: "Vue",
        };
    }

    const shouldEmitDeclarations = process.env.TYPES != null;

    const tsPlugin = ts({
        check: process.env.NODE_ENV === "production",
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        cacheRoot: path.resolve(__dirname, "node_modules/.rts2_cache"),
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: output.sourcemap,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations,
            },
            exclude: ["__tests__", "test-dts"],
        },
    });

    const entryFile = "lib/index.ts";

    const external = ["vue", "axios"];

    const nodePlugins = [
        require("@rollup/plugin-node-resolve")(),
        require("@rollup/plugin-commonjs")(),
    ];

    return {
        input: resolve(entryFile),
        // Global and Browser ESM builds inlines everything so that they can be
        // used alone.
        external,
        plugins: [
            json({
                namedExports: false,
            }),
            tsPlugin,
            createReplacePlugin(
                isProductionBuild,
                isBundlerESMBuild,
                // isBrowserBuild?
                isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
                isGlobalBuild,
                isNodeBuild
            ),
            ...nodePlugins,
            ...plugins,
        ],
        output,
        onwarn: (msg, warn) => {
            if (!/Circular/.test(msg)) {
                warn(msg);
            }
        },
    };
}

function createReplacePlugin(
    isProduction,
    isBundlerESMBuild,
    isBrowserBuild,
    isGlobalBuild,
    isNodeBuild
) {
    const replacements = {
        __COMMIT__: `"${process.env.COMMIT}"`,
        __VERSION__: `"${version}"`,
        __DEV__: isBundlerESMBuild
            ? // preserve to be handled by bundlers
              `(process.env.NODE_ENV !== 'production')`
            : // hard coded dev/prod builds
              !isProduction,
        // this is only used during Vue's internal tests
        __TEST__: false,
        // If the build is expected to run directly in the browser (global / esm builds)
        __BROWSER__: isBrowserBuild,
        // is targeting bundlers?
        __BUNDLER__: isBundlerESMBuild,
        __GLOBAL__: isGlobalBuild,
        // is targeting Node (SSR)?
        __NODE_JS__: isNodeBuild,
        __FEATURE_OPTIONS__: true,
        __FEATURE_SUSPENSE__: true,
    };
    // allow inline overrides like
    //__RUNTIME_COMPILE__=true yarn build runtime-core
    Object.keys(replacements).forEach((key) => {
        if (key in process.env) {
            replacements[key] = process.env[key];
        }
    });
    return replace(replacements);
}

function createProductionConfig(format) {
    return createConfig(format, {
        file: resolve(`dist/request.${format}.prod.js`),
        format: outputConfigs[format].format,
    });
}

function createMinifiedConfig(format) {
    const { terser } = require("rollup-plugin-terser");
    return createConfig(
        format,
        {
            file: outputConfigs[format].file.replace(/\.js$/, ".prod.js"),
            format: outputConfigs[format].format,
        },
        [
            terser({
                module: /^esm/.test(format),
                compress: {
                    ecma: 2015,
                    pure_getters: true,
                },
            }),
        ]
    );
}
