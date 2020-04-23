const execa = require("execa");

const args = require("minimist")(process.argv.slice(2));
const formats = args.formats || args.f;
const sourceMap = args.sourcemap || args.s;

execa(
    "rollup",
    [
        "-wc",
        "--environment",
        [`FORMATS:${formats || "global"}`, sourceMap ? `SOURCE_MAP:true` : ``]
            .filter(Boolean)
            .join(","),
    ],
    {
        stdio: "inherit",
    }
);
