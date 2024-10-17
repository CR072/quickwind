module.exports = function (a) {
    const b = new Set();
    const c = a.match(/(?:class|className)=["']([^"']+)["']/g) || [];
    for (const d of c) {
        const e = d.match(/["']([^"']+)["']/)[1].trim().split(/\s+/);
        for (const f of e) b.add(f);
    }
    return Array.from(b);
};