const defaultConfig = require('../defaultConfig.json');
const tailwindMap = {
    text: (a) => `color: ${a};`,
    bg: (a) => `background-color: ${a};`,
    border: (a) => `border-color: ${a};`,
    p: (a) => `padding: ${a};`,
    m: (a) => `margin: ${a};`,
    w: (a) => `width: ${a};`,
    h: (a) => `height: ${a};`,
    fontSize: (a, b) => `font-size: ${a}; line-height: ${b.lineHeight};`,
    fontWeight: (a) => `font-weight: ${a};`,
    textAlign: (a) => `text-align: ${a};`,
    display: (a) => `display: ${a};`
};
const propertyMapping = {
    'text': 'font-size',
    'font': 'font-weight',
    'leading': 'line-height',
    'tracking': 'letter-spacing',
    'list': 'list-style',
    'w': 'width',
    'h': 'height',
    'min-w': 'min-width',
    'max-w': 'max-width',
    'min-h': 'min-height',
    'max-h': 'max-height',
    'p': 'padding',
    'px': 'padding-left', 'pr': 'padding-right',
    'py': 'padding-top', 'pb': 'padding-bottom',
    'pl': 'padding-left', 'pt': 'padding-top',
    'm': 'margin',
    'mx': 'margin-left', 'mr': 'margin-right',
    'my': 'margin-top', 'mb': 'margin-bottom',
    'ml': 'margin-left', 'mt': 'margin-top',
    'space-x': 'margin-left', 'space-y': 'margin-top',
    'border': 'border-width',
    'border-t': 'border-top-width', 'border-b': 'border-bottom-width',
    'border-l': 'border-left-width', 'border-r': 'border-right-width',
    'bg': 'background-color',
    'text': 'color',
    'border': 'border-color',
    'from': '--tw-gradient-from',
    'via': '--tw-gradient-via',
    'to': '--tw-gradient-to',
    'opacity': 'opacity',
    'flex': 'flex',
    'grid': 'grid',
    'col-span': 'grid-column',
    'row-span': 'grid-row',
    'gap': 'gap',
    'space': 'gap',
    'top': 'top', 'right': 'right', 'bottom': 'bottom', 'left': 'left',
    'z': 'z-index',
    'shadow': 'box-shadow',
    'rounded': 'border-radius',
    'rotate': 'transform',
    'scale': 'transform',
    'translate-x': 'transform',
    'translate-y': 'transform',
    'skew-x': 'transform',
    'skew-y': 'transform',
    'overflow': 'overflow',
    'hidden': 'visibility',
    'visible': 'visibility',
    'cursor': 'cursor',
    'pointer-events': 'pointer-events',
    'select': 'user-select',
    'transition': 'transition',
    'transform': 'transform',
    'blur': 'filter',
    'invert': 'filter',
};

const classMatchers = require('./handlers')(getColor, getSize, getFontWeight, tailwindMap, propertyMapping);
function build(a, b = defaultConfig) {
    let c = `*{box-sizing:border-box;}html,body{margin:0;}`;
    const d = { ...b.theme, ...defaultConfig.theme };
    const e = new Set();
    for (let f of a) {
        if (!e.has(f)) {
            let g = '';
            for (const h of classMatchers) {
                if (h.match(f)) {
                    g = h.handler(f, d);
                    if (g) break;
                }
            }
            if (g) {
                c += `${escapeClassName(g)}\n`;
                e.add(f);
            }
        }
    }
    return c;
}
function escapeClassName(a) {
    let b = a.replace(/\//g, '\\/');
    let c = b.split('{')[0];
    b = b.replace(c, '');
    c = `.${c.replace(/\./g, '\\.')}`;
    c = c.replace('-[', '-\\[')
    c = c.replace(']', '\\]')
    b = `${c}${b}`;
    b = b.slice(2);
    return b;
}
function getColor(a, b, c) {
    const [d, e] = a.replace(`${b}-`, '').split('/');
    const f = d.split('-');
    const g = f[0];
    const h = f[1] || null;
    const i = e ? parseFloat(e) / 100 : 1;
    if (g === 'transparent') return 'transparent';
    const j = c[g];
    if (j) {
        if (typeof j === 'string') return applyOpacity(j, i);
        if (j[h]) return applyOpacity(j[h], i);
    }
    return null;
}
function applyOpacity(a, b) {
    if (!a.startsWith('#')) return a;
    const c = parseInt(a.slice(1), 16);
    const d = (c >> 16) & 255;
    const e = (c >> 8) & 255;
    const f = c & 255;
    return `rgba(${d},${e},${f},${b})`;
}
function getFontWeight(a, b, c) {
    const d = a.replace(`${b}-`, '');
    return c[d] || null;
}
function getSize(a, b, c) {
    const d = a.replace(`${b}-`, '');
    return c[d] || null;
}
module.exports = { build };