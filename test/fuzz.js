const seed = require('math-random-seed');
const test = require('node:test');
const html = require('nanohtml');

const nanomorph = require('../');

test('chaos monkey #1', t => {
  const a = html`<div r="r"><div></div></div>`;
  const b = html`<div io="iO" vq="Vq"><div></div></div>`;
  compare(a, b, t);
});

// modeled after
// https://github.com/mafintosh/hypercore/blob/master/test/tree-index.js
const random = seed('choo choo');
let props = null;
test('fuzz tests', t => {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      const a = create(i, j, 0);
      for (let k = 0; k < 3; k++) {
        const b = create(i, k, 1);
        props = { depth: i, propCount: j, offset: k };
        compare(a, b, t, props);
      }
    }
  }
});

function create(depth, propCount) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const root = document.createElement('div');
  let el = root;
  let _el = null;
  let str = '';
  for (let i = 0; i < depth; i++) {
    _el = document.createElement('div');
    el.appendChild(_el);
    for (let j = 0; j < propCount; j++) {
      str = '';
      for (let k = propCount; k > 0; --k) {
        str += chars[Math.floor(random() * 100) % chars.length];
      }
      el.setAttribute(str, str);
    }
    el = _el;
  }
  return root;
}

function compare(a, b, t, props) {
  props = props ? JSON.stringify(props) : undefined;
  const expected = b.cloneNode(true);
  const res = nanomorph(a, b);
  deepEqualNode(res, expected, t, props);
}

function deepEqualNode(a, b, t, props) {
  t.assert.ok(a.isEqualNode(b), props);
  for (let i = a.childNodes.length - 1; i >= 0; --i) {
    deepEqualNode(a.childNodes[i], a.childNodes[i], t, props);
  }
}
