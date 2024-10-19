#!/usr/bin/env node
const path = require("path");
if ("init" === process.argv[2]) {
    const t = require("fs"),
        n = path.join("./tailwind.config.js");
    t.existsSync(n) ||
        t.writeFileSync(
            n,
            "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  mode: 'jit',\n  content: [\n    \"./views/*.{html,js,jsx,tsx}\",\n  ],\n  output: './tailwind.css',\n  theme: {\n    extend: {\n      colors: {\n        white: '#FFFFFF'\n      }\n    },\n  },\n  plugins: [],\n}"
        );
} else if ("watch" === process.argv[2] || "w" === process.argv[2] || "--watch" === process.argv[2]) {
    require("./src/watcher");
} else {
    console.time("Built in")
    const { build: t } = require("./src/extract"),
        n = path.resolve(process.cwd(), "tailwind.config.js"),
        i = require(n),
        s = process.argv.slice(2);
    t(i, i.output || s.find((t) => t.startsWith("-o"))?.split("=")[1] || s.find((t, idx) => t === "-o" ? s[idx + 1] : undefined) || s);
    console.timeEnd("Built in")
}