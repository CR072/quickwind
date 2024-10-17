const fs = require("fs").promises,
    fsSync = require("fs"),
    path = require("path"),
    {
        Worker: Worker,
        isMainThread: isMainThread,
        parentPort: parentPort,
    } = require("worker_threads"),
    parse = require("./parser"),
    builder = require("./builder");
async function matchFiles(e, r) {
    const i = r.match(/\{(.+?)\}/)?.[1].split(",") || [],
        t = r.includes("**"),
        a = path.join(e, r.split("/").slice(0, -1).join("/").replace("**", ""));
    return t ? walkRecursive(a, i) : walk(a, i);
}
async function walk(e, r) {
    return (await fs.readdir(e, { withFileTypes: !0 }))
        .filter((e) => e.isFile() && matchExtension(e.name, r))
        .map((r) => path.join(e, r.name));
}
async function walkRecursive(e, r) {
    const i = await fs.readdir(e, { withFileTypes: !0 });
    let t = [];
    for (const a of i) {
        const i = path.join(e, a.name);
        a.isDirectory()
            ? t.push(...(await walkRecursive(i, r)))
            : a.isFile() && matchExtension(a.name, r) && t.push(i);
    }
    return t;
}
function matchExtension(e, r) {
    return 0 === r.length || r.includes(path.extname(e).slice(1));
}
async function build(e, r) {
    const i = removeDuplicateValues(
        (
            await Promise.all(e.content.map((e) => matchFiles(process.cwd(), e)))
        ).flat()
    );
    let t;
    t =
        i.length < 2
            ? i.map((e) => fsSync.readFileSync(e, "utf8"))
            : i.length < 100
                ? await Promise.all(i.map((e) => fs.readFile(e, "utf8")))
                : await loadFilesInWorker(i);
    const a = t.join("\n"),
        n = parse(a),
        s = builder.build(n, e);
    await fs.writeFile(r, s, "utf8");
}
async function loadFilesInWorker(e) {
    return new Promise((r, i) => {
        const t = new Worker(__filename, { workerData: e });
        t.on("message", r),
            t.on("error", i),
            t.on("exit", (e) => {
                0 !== e && i(new Error(`Worker stopped with exit code ${e}`));
            });
    });
}
if (isMainThread) module.exports = { build: build };
else {
    const { workerData: e } = require("worker_threads"),
        r = e.map((e) => fsSync.readFileSync(e, "utf8"));
    parentPort.postMessage(r);
}
function removeDuplicateValues(e) {
    return [...new Set(e)];
}
