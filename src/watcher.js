const fs = require('fs');
const path = require('path');
const { build: t } = require("./extract");
const configPath = path.resolve(process.cwd(), "tailwind.config.js");
const config = require(configPath);
const args = process.argv.slice(2);

console.log('Watching for file changes...');

const extractDirectories = (content) => content.map(p => path.join(process.cwd(), p.split("/").slice(0, -1).join("/").replace("**", "")));
const isFileInWatchedDirectories = (f) => dirs.some(d => f.startsWith(d));

let timeout;
const debounceBuild = (f) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.time("Built in");
        console.log(`${f} has changed. Rebuilding...`);
        t(config, config.output || args.find(a => a.startsWith("-o"))?.split("=")[1] || args.find((a, idx) => a === "-o" ? args[idx + 1] : undefined) || args);
        console.timeEnd("Built in");
    }, 2);
};

const dirs = extractDirectories(config.content);
dirs.forEach(d => fs.watch(d, { recursive: true }, (e, f) => f && isFileInWatchedDirectories(path.join(d, f)) && debounceBuild(f)));