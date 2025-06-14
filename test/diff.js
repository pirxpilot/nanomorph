import test from 'node:test';
import html from 'nanohtml';
import morph from '../index.js';

test('abstract morph', async t => {
  await t.test('root level', async t => {
    await t.test('should replace a node', t => {
      t.plan(1);
      const a = html`<p>hello world</p>`;
      const b = html`<div>hello world</div>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should replace a component', t => {
      t.plan(2);
      function ComponentA() {
        return html`<div data-morph="a">hello world</div>`;
      }
      function ComponentB() {
        return html`<div data-morph="b">bye moon</div>`;
      }

      const a = ComponentA();
      const b = ComponentB();

      const expectedA = a.outerHTML;
      const expectedB = b.outerHTML;

      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expectedB, 'result was expected');
      t.assert.equal(a.outerHTML, expectedA, 'did not mutate input tree');
    });

    await t.test('should morph a node', t => {
      t.plan(1);
      const a = html`<p>hello world</p>`;
      const b = html`<p>hello you</p>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should morph a node with namespaced attribute', t => {
      t.plan(1);
      const a = html`<svg><use xlink:href="#heybooboo"></use></svg>`;
      const b = html`<svg><use xlink:href="#boobear"></use></svg>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should ignore if node is same', t => {
      t.plan(1);
      const a = html`<p>hello world</p>`;
      const expected = a.outerHTML;
      const res = morph(a, a);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });
  });

  await t.test('nested', async t => {
    await t.test('should replace a node', t => {
      t.plan(1);
      const a = html`<main><p>hello world</p></main>`;
      const b = html`<main><div>hello world</div></main>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should replace a node', t => {
      t.plan(1);
      const a = html`<main><p>hello world</p></main>`;
      const b = html`<main><p>hello you</p></main>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should replace a node', t => {
      t.plan(1);
      const a = html`<main><p>hello world</p></main>`;
      const res = morph(a, a);
      const expected = a.outerHTML;
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should append a node', t => {
      t.plan(1);
      const a = html`<main></main>`;
      const b = html`<main><p>hello you</p></main>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should remove a node', t => {
      t.plan(1);
      const a = html`<main><p>hello you</p></main>`;
      const b = html`<main></main>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should update child nodes', t => {
      t.plan(1);
      const a = html`<main><p>hello world</p></main>`;
      const b = html`<section><p>hello you</p></section>`;
      const expected = '<main><p>hello you</p></main>';
      const res = morph(a, b, { childrenOnly: true });
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });
  });

  await t.test('values', async t => {
    await t.test('if new tree has no value and old tree does, remove value', t => {
      t.plan(4);
      let a = html`<input type="text" value="howdy" />`;
      let b = html`<input type="text" />`;
      let res = morph(a, b);
      t.assert.equal(res.getAttribute('value'), null);
      t.assert.equal(res.value, '');

      a = html`<input type="text" value="howdy" />`;
      b = html`<input type="text" value=${null} />`;
      res = morph(a, b);
      t.assert.equal(res.getAttribute('value'), null);
      t.assert.equal(res.value, '');
    });

    await t.test('if new tree has value and old tree does too, set value from new tree', t => {
      t.plan(4);
      let a = html`<input type="text" value="howdy" />`;
      let b = html`<input type="text" value="hi" />`;
      let res = morph(a, b);
      t.assert.equal(res.value, 'hi');

      a = html`<input type="text" />`;
      a.value = 'howdy';
      b = html`<input type="text" />`;
      b.value = 'hi';
      res = morph(a, b);
      t.assert.equal(res.value, 'hi');

      a = html`<input type="text" value="howdy" />`;
      b = html`<input type="text" />`;
      b.value = 'hi';
      res = morph(a, b);
      t.assert.equal(res.value, 'hi');

      a = html`<input type="text" />`;
      a.value = 'howdy';
      b = html`<input type="text" value="hi" />`;
      res = morph(a, b);
      t.assert.equal(res.value, 'hi');
    });
  });

  function booleanPropertyTest(property) {
    return async t => {
      await t.test(`if new tree has no ${property} and old tree does, remove value`, t => {
        t.plan(1);
        const a = html`<input type="checkbox" ${property}=${true} />`;
        const b = html`<input type="checkbox" />`;
        const res = morph(a, b);
        t.assert.equal(res[property], false);
      });

      await t.test(`if new tree has ${property} and old tree does not, add value`, t => {
        t.plan(1);
        const a = html`<input type="checkbox" />`;
        const b = html`<input type="checkbox" ${property}=${true} />`;
        const res = morph(a, b);
        t.assert.equal(res[property], true);
      });

      await t.test(`if new tree has ${property} and old tree does too, set value from new tree`, t => {
        t.plan(6);
        let a = html`<input type="checkbox" ${property}=${false} />`;
        let b = html`<input type="checkbox" ${property}=${true} />`;
        let res = morph(a, b);
        t.assert.equal(res[property], true);

        a = html`<input type="checkbox" ${property}=${true} />`;
        b = html`<input type="checkbox" ${property}=${false} />`;
        res = morph(a, b);
        t.assert.equal(res[property], false);

        a = html`<input type="checkbox" />`;
        b = html`<input type="checkbox" />`;
        b[property] = true;
        res = morph(a, b);
        t.assert.equal(res[property], true);

        a = html`<input type="checkbox" ${property}=${false} />`;
        b = html`<input type="checkbox" />`;
        b[property] = true;
        res = morph(a, b);
        t.assert.equal(res[property], true);

        a = html`<input type="checkbox" ${property}=${true} />`;
        b = html`<input type="checkbox" />`;
        b[property] = false;
        res = morph(a, b);
        t.assert.equal(res[property], false);

        a = html`<input type="checkbox" />`;
        b = html`<input type="checkbox" ${property}=${true} />`;
        res = morph(a, b);
        t.assert.equal(res[property], true);
      });
    };
  }

  await t.test('checked', booleanPropertyTest('checked'));
  await t.test('disabled', booleanPropertyTest('disabled'));

  await t.test('indeterminate', t => {
    t.plan(2);
    let a = html`<input type="checkbox" />`;
    let b = html`<input type="checkbox" />`;
    b.indeterminate = true;
    let res = morph(a, b);
    t.assert.equal(res.indeterminate, true);

    a = html`<input type="checkbox" />`;
    b = html`<input type="checkbox" />`;
    a.indeterminate = true;
    res = morph(a, b);
    t.assert.equal(res.indeterminate, false);
  });

  await t.test('isSameNode', async t => {
    await t.test('should return a if true', t => {
      t.plan(1);
      const a = html`<div>YOLO</div>`;
      const b = html`<div>FOMO</div>`;
      b.isSameNode = () => true;
      const res = morph(a, b);
      t.assert.equal(res.childNodes[0].data, 'YOLO');
    });

    await t.test('should return b if false', t => {
      t.plan(1);
      const a = html`<div>YOLO</div>`;
      const b = html`<div>FOMO</div>`;
      b.isSameNode = () => false;
      const res = morph(a, b);
      t.assert.equal(res.childNodes[0].data, 'FOMO');
    });
  });

  await t.test('lists', async t => {
    await t.test('should append nodes', t => {
      t.plan(1);
      const a = html`<ul></ul>`;
      const b = html`<ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should remove nodes', t => {
      t.plan(1);
      const a = html`<ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>`;
      const b = html`<ul></ul>`;
      const res = morph(a, b);
      const expected = b.outerHTML;
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });
  });

  await t.test('selectables', async t => {
    await t.test('should append nodes', async t => {
      t.plan(1);
      const a = html`<select></select>`;
      const b = html`<select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should append nodes (including optgroups)', t => {
      t.plan(1);
      const a = html`<select></select>`;
      const b = html`<select>
          <optgroup>
            <option>1</option>
            <option>2</option>
          </optgroup>
          <option>3</option>
          <option>4</option>
        </select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should remove nodes', t => {
      t.plan(1);
      const a = html`<select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>`;
      const b = html`<select></select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should remove nodes (including optgroups)', t => {
      t.plan(1);
      const a = html`<select>
          <optgroup>
            <option>1</option>
            <option>2</option>
          </optgroup>
          <option>3</option>
          <option>4</option>
        </select>`;
      const b = html`<select></select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should add selected', t => {
      t.plan(1);
      const a = html`<select>
          <option>1</option>
          <option>2</option>
        </select>`;
      const b = html`<select>
          <option>1</option>
          <option selected>2</option>
        </select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should add selected (xhtml)', t => {
      t.plan(1);
      const a = html`<select>
          <option>1</option>
          <option>2</option>
        </select>`;
      const b = html`<select>
          <option>1</option>
          <option selected="selected">2</option>
        </select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });

    await t.test('should switch selected', t => {
      t.plan(1);
      const a = html`<select>
          <option selected="selected">1</option>
          <option>2</option>
        </select>`;
      const b = html`<select>
          <option>1</option>
          <option selected="selected">2</option>
        </select>`;
      const expected = b.outerHTML;
      const res = morph(a, b);
      t.assert.equal(res.outerHTML, expected, 'result was expected');
    });
  });

  await t.test('should replace nodes', t => {
    t.plan(1);
    let a = html`<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>`;
    const b = html`<ul>
        <div>1</div>
        <li>2</li>
        <p>3</p>
        <li>4</li>
        <li>5</li>
      </ul>`;
    const expected = b.outerHTML;
    a = morph(a, b);
    t.assert.equal(a.outerHTML, expected, 'result was expected');
  });

  await t.test('should replace nodes after multiple iterations', t => {
    t.plan(2);

    let a = html`<ul></ul>`;
    let b = html`<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>`;
    let expected = b.outerHTML;

    a = morph(a, b);
    t.assert.equal(a.outerHTML, expected, 'result was expected');

    b = html`<ul>
        <div>1</div>
        <li>2</li>
        <p>3</p>
        <li>4</li>
        <li>5</li>
      </ul>`;
    expected = b.outerHTML;

    a = morph(a, b);
    t.assert.equal(a.outerHTML, expected, 'result was expected');
  });
});

test('use id as a key hint', async t => {
  await t.test('append an element', t => {
    const a = html`<ul>
      <li id="a"></li>
      <li id="b"></li>
      <li id="c"></li>
    </ul>`;
    const b = html`<ul>
      <li id="a"></li>
      <li id="new"></li>
      <li id="b"></li>
      <li id="c"></li>
    </ul>`;
    const target = b.outerHTML;

    const oldFirst = a.children[0];
    const oldSecond = a.children[1];
    const oldThird = a.children[2];

    const c = morph(a, b);
    t.assert.equal(oldFirst, c.children[0], 'first is equal');
    t.assert.equal(oldSecond, c.children[2], 'moved second is equal');
    t.assert.equal(oldThird, c.children[3], 'moved third is equal');
    t.assert.equal(c.outerHTML, target);
  });

  await t.test('handle non-id elements', t => {
    const a = html`<ul>
      <li></li>
      <li id="a"></li>
      <li id="b"></li>
      <li id="c"></li>
      <li></li>
    </ul>`;
    const b = html`<ul>
      <li></li>
      <li id="a"></li>
      <li id="new"></li>
      <li id="b"></li>
      <li id="c"></li>
      <li></li>
    </ul>`;
    const target = b.outerHTML;

    const oldSecond = a.children[1];
    const oldThird = a.children[2];
    const oldForth = a.children[3];

    const c = morph(a, b);
    t.assert.equal(oldSecond, c.children[1], 'second is equal');
    t.assert.equal(oldThird, c.children[3], 'moved third is equal');
    t.assert.equal(oldForth, c.children[4], 'moved forth is equal');
    t.assert.equal(c.outerHTML, target);
  });

  await t.test('copy over children', t => {
    const a = html`<section>
      'hello'
      <section></section>
    </section>`;
    const b = html`<section>
      <div></div>
      <section></section>
    </section>`;
    const expected = b.outerHTML;

    const c = morph(a, b);
    t.assert.equal(c.outerHTML, expected, expected);
  });

  await t.test('remove an element', t => {
    const a = html`<ul>
      <li id="a"></li>
      <li id="b"></li>
      <li id="c"></li>
    </ul>`;
    const b = html`<ul>
      <li id="a"></li>
      <li id="c"></li>
    </ul>`;

    const oldFirst = a.children[0];
    const oldThird = a.children[2];
    const expected = b.outerHTML;

    const c = morph(a, b);

    t.assert.equal(c.children[0], oldFirst, 'first is equal');
    t.assert.equal(c.children[1], oldThird, 'second untouched');
    t.assert.equal(c.outerHTML, expected);
  });

  await t.test('swap proxy elements', t => {
    const nodeA = html`<li id="a"></li>`;
    const placeholderA = html`<div id="a" data-placeholder="true"></div>`;
    placeholderA.isSameNode = el => el === nodeA;

    const nodeB = html`<li id="b"></li>`;
    const placeholderB = html`<div id="b" data-placeholder="true"></div>`;
    placeholderB.isSameNode = el => el === nodeB;

    const a = html`<ul>
      ${nodeA}${nodeB}
    </ul>`;
    const b = html`<ul>
      ${placeholderB}${placeholderA}
    </ul>`;
    const c = morph(a, b);

    t.assert.equal(c.children[0], nodeB, 'c.children[0] === nodeB');
    t.assert.equal(c.children[1], nodeA, 'c.children[1] === nodeA');
  });

  await t.test('id match still morphs', t => {
    const a = html`<li id="12">FOO</li>`;
    const b = html`<li id="12">BAR</li>`;
    const target = b.outerHTML;
    const c = morph(a, b);
    t.assert.equal(c.outerHTML, target);
  });

  await t.test('remove orphaned keyed nodes', t => {
    const a = html`
      <div>
        <div>1</div>
        <li id="a">a</li>
      </div>
    `;
    const b = html`
      <div>
        <div>2</div>
        <li id="b">b</li>
      </div>
    `;
    const expected = b.outerHTML;
    const c = morph(a, b);
    t.assert.equal(c.outerHTML, expected);
  });

  await t.test('whitespace', t => {
    const a = html`<ul></ul>`;
    const b = html`<ul>
      <li></li>
      <li></li>
    </ul>`;
    const expected = b.outerHTML;
    const c = morph(a, b);
    t.assert.equal(c.outerHTML, expected);
  });

  await t.test('nested with id', t => {
    const child = html`<div id="child"></div>`;
    const placeholder = html`<div id="child"></div>`;
    placeholder.isSameNode = el => el === child;

    const a = html`<div><div id="parent">${child}</div></div>`;
    const b = html`<div><div id="parent">${placeholder}</div></div>`;

    const c = morph(a, b);
    t.assert.equal(c.children[0].children[0], child, 'is the same node');
  });

  await t.test('nested without id', t => {
    const child = html`<div id="child">child</div>`;
    const placeholder = html`<div id="child">placeholder</div>`;
    placeholder.isSameNode = el => el === child;

    const a = html`<div><div>${child}</div></div>`;
    const b = html`<div><div>${placeholder}</div></div>`;

    const c = morph(a, b);
    t.assert.equal(c.children[0].children[0], child, 'is the same node');
  });
});

test('fragments', async t => {
  await t.test('disallow document fragments', t => {
    const a = html`<div><div>a</div></div>`;
    const b = html`<div>a</div><div>b</div>`;

    t.assert.throws(morph.bind(null, a, b), /newTree should have one root node/, 'no fragments');
  });

  await t.test('allow document fragments with `childrenOnly`', t => {
    const a = html`<main><div>a</div></main>`;
    const b = html`<div>a</div><div>b</div>`;

    const c = morph(a, b, { childrenOnly: true });
    t.assert.equal(c.outerHTML, '<main><div>a</div><div>b</div></main>');
  });
});
