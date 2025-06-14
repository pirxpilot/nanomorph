[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# @pirxpilot/nanomorph

Hyper fast diffing algorithm for real DOM nodes :zap:
It is a fork of [nanomorph](https://github.com/choojs/nanomorph)

## Usage
```js
var morph = require('nanomorph')
var html = require('nanohtml')

var tree = html`<div>hello people</div>`
document.body.appendChild(tree)
// document.body === <body><div>hello people</div></body>

morph(tree, html`<div>nanananana-na-no</div>`)
// document.body === <body><div>nanananana-na-no</div></body>

morph(tree, html`<div>teeny, tiny, tin bottle</div>`)
// document.body === <body><div>teeny, tiny, tin bottle</div></body>
```

## Clearing Input Values
To remove values from inputs, there's a few options:
```js
html`<input class="beep" value=${null}>` // set the value to null
html`<input class="beep">`               // omit property all together
```

## Reordering Lists
It's common to work with lists of elements on the DOM. Adding, removing or
reordering elements in a list can be rather expensive. To optimize this you can
add an `id` attribute to a DOM node. When reordering nodes it will compare
nodes with the same ID against each other, resulting in far fewer re-renders.
This is especially potent when coupled with DOM node caching.

```js
var el = html`
  <section>
    <div id="first">hello</div>
    <div id="second">world</div>
  </section>
`
```

## Caching DOM elements
Sometimes we want to tell the algorithm to not evaluate certain nodes (and its
children). This can be because we're sure they haven't changed, or perhaps
because another piece of code is managing that part of the DOM tree. To achieve
this `nanomorph` evaluates the `.isSameNode()` method on nodes to determine if
they should be updated or not.

```js
var el = html`<div>node</div>`

// tell nanomorph to not compare the DOM tree if they're both divs
el.isSameNode = function (target) {
  return (target && target.nodeName && target.nodeName === 'DIV')
}
```

## Prevent Morphing Particular Elements
There are situations where two elements should never be morphed, but replaced.
`nanomorph` automatically does this for elements with different tag names. But if
we're implementing a custom component system, for example, components of
different types should probably be treated as if they had different tags—even
if they both render a `<div>` at their top level.

Nodes can have an optional `data-morph` attribute. `nanomorph`
will only ever morph nodes if they both have the same value in this attribute.
If the values differ, the old node is replaced with the new one.

```js
var el = html`<div data-morph="a">hello</div>`
var el2 = html`<div data-morph="b">goodbye</div>`

assert.equal(nanomorph(el, el2), el2)
```

nanomorph doesn't have an opinion on the values of the `data-morph`
attribute, so we can decide the meaning we give it on a case by case basis. There
could be a unique ID for every _type_ of component, or a unique ID for every
_instance_ of a component, or any other meaning.

## FAQ
### How is this different from morphdom?
It's quite similar actually; the API of this library is completely compatible
with `morphdom` and we've borrowed a fair few bits. The main difference is that
we copy event handlers like `onclick`, don't support browsers that are over a
decade old, and don't provide custom behavior by removing all hooks. This way
we can guarantee a consistent, out-of-the box experience for all your diffing
needs.

### Why doesn't this work in Node?
Node has no concept of a DOM - server side rendering is basically fancy string
concatenation. If you want to combine HTML strings in Node, check out
[hyperstream][hyperstream].

### This library seems cool, I'd like to build my own!
Nanomorph was optimized for simplicity, but different situations might require
different tradeoffs. So in order to allow folks to build their own
implementation we expose our test suite as a function you can call. So
regardless if you're doing it to solve a problem, or just for fun: you can use
the same tests we use for your own implementation. Yay! :sparkles:

## API
### tree = nanomorph(oldTree, newTree)
Diff a tree of HTML elements against another tree of HTML elements and create
a patched result that can be applied on the DOM.

:warning: nanomorph will modify the newTree and it should be discarded after use

## Installation
```sh
$ npm install nanomorph
```

## See Also
- [yoshuawuyts/nanoraf](https://github.com/yoshuawuyts/nanoraf)
- [yoshuawuyts/nanocomponent](https://github.com/yoshuawuyts/nanocomponent)
- [yoshuawuyts/nanotick](https://github.com/yoshuawuyts/nanotick)
- [bendrucker/document-ready](https://github.com/bendrucker/document-ready)
- [shama/on-load](https://github.com/shama/on-load)
- [choojs/nanohtml](https://github.com/choojs/nanohtml)

## Similar Packages
- [patrick-steele-idem/morphdom](https://github.com/patrick-steele-idem/morphdom)
- [tbranyen/diffhtml](https://github.com/tbranyen/diffhtml)

## Further Reading
- [how to write your own virtual dom 1][own-vdom-1]
- [how to write your own virtual dom 2][own-vdom-2]

## Authors
- [Kristofer Joseph](https://github.com/kristoferjoseph)
- [Yoshua Wuyts](https://github.com/yoshuawuyts)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[mt]: https://en.wikipedia.org/wiki/Merkle_tree
[own-vdom-1]: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
[own-vdom-2]: https://medium.com/@deathmood/write-your-virtual-dom-2-props-events-a957608f5c76
[hyperstream]: https://github.com/substack/hyperstream

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/nanomorph
[npm-url]: https://npmjs.org/package/@pirxpilot/nanomorph

[build-url]: https://github.com/pirxpilot/nanomorph/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/nanomorph/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/@pirxpilot/nanomorph
[deps-url]: https://libraries.io/npm/@pirxpilot%2Fnanomorph
