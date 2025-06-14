import test from 'node:test';
import html from 'nanohtml';
import morph from '../index.js';
import events from './fixtures/events.js';

function raiseEvent(element, eventName) {
  const event = new Event(eventName, {
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(event);
}

test('events', async t => {
  await t.test('should have onabort events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onabort=${pass}></input>`;

    raiseEvent(res, 'abort');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onabort events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onabort=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'abort');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onabort events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onabort=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'abort');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onblur events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onblur=${pass}></input>`;

    raiseEvent(res, 'blur');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onblur events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onblur=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'blur');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onblur events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onblur=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'blur');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onchange events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onchange=${pass}></input>`;

    raiseEvent(res, 'change');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onchange events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onchange=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'change');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onchange events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onchange=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'change');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onclick events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onclick=${pass}></input>`;

    raiseEvent(res, 'click');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onclick events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onclick=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'click');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onclick events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onclick=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'click');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have oncontextmenu events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input oncontextmenu=${pass}></input>`;

    raiseEvent(res, 'contextmenu');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy oncontextmenu events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input oncontextmenu=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'contextmenu');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy oncontextmenu events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input oncontextmenu=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'contextmenu');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondblclick events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondblclick=${pass}></input>`;

    raiseEvent(res, 'dblclick');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondblclick events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondblclick=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dblclick');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondblclick events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondblclick=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dblclick');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondrag events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondrag=${pass}></input>`;

    raiseEvent(res, 'drag');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondrag events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondrag=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'drag');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondrag events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondrag=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'drag');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondragend events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondragend=${pass}></input>`;

    raiseEvent(res, 'dragend');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondragend events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondragend=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragend');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondragend events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondragend=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragend');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondragenter events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondragenter=${pass}></input>`;

    raiseEvent(res, 'dragenter');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondragenter events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondragenter=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragenter');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondragenter events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondragenter=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragenter');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondragleave events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondragleave=${pass}></input>`;

    raiseEvent(res, 'dragleave');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondragleave events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondragleave=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragleave');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondragleave events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondragleave=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragleave');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondragover events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondragover=${pass}></input>`;

    raiseEvent(res, 'dragover');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondragover events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondragover=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragover');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondragover events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondragover=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragover');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondragstart events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondragstart=${pass}></input>`;

    raiseEvent(res, 'dragstart');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondragstart events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondragstart=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragstart');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondragstart events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondragstart=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'dragstart');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have ondrop events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ondrop=${pass}></input>`;

    raiseEvent(res, 'drop');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ondrop events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ondrop=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'drop');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy ondrop events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ondrop=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'drop');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onerror events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onerror=${pass}></input>`;

    raiseEvent(res, 'error');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onerror events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onerror=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'error');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onerror events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onerror=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'error');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onfocus events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onfocus=${pass}></input>`;

    raiseEvent(res, 'focus');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onfocus events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onfocus=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'focus');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onfocus events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onfocus=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'focus');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have oninput events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input oninput=${pass}></input>`;

    raiseEvent(res, 'input');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy oninput events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input oninput=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'input');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy oninput events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input oninput=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'input');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onkeydown events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onkeydown=${pass}></input>`;

    raiseEvent(res, 'keydown');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onkeydown events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onkeydown=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keydown');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onkeydown events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onkeydown=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keydown');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onkeypress events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onkeypress=${pass}></input>`;

    raiseEvent(res, 'keypress');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onkeypress events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onkeypress=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keypress');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onkeypress events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onkeypress=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keypress');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onkeyup events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onkeyup=${pass}></input>`;

    raiseEvent(res, 'keyup');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onkeyup events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onkeyup=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keyup');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onkeyup events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onkeyup=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'keyup');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmousedown events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmousedown=${pass}></input>`;

    raiseEvent(res, 'mousedown');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmousedown events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmousedown=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mousedown');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmousedown events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmousedown=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mousedown');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmouseenter events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmouseenter=${pass}></input>`;

    raiseEvent(res, 'mouseenter');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmouseenter events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmouseenter=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseenter');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmouseenter events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmouseenter=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseenter');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmouseleave events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmouseleave=${pass}></input>`;

    raiseEvent(res, 'mouseleave');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmouseleave events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmouseleave=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseleave');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmouseleave events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmouseleave=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseleave');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmousemove events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmousemove=${pass}></input>`;

    raiseEvent(res, 'mousemove');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmousemove events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmousemove=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mousemove');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmousemove events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmousemove=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mousemove');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmouseout events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmouseout=${pass}></input>`;

    raiseEvent(res, 'mouseout');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmouseout events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmouseout=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseout');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmouseout events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmouseout=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseout');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmouseover events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmouseover=${pass}></input>`;

    raiseEvent(res, 'mouseover');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmouseover events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmouseover=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseover');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmouseover events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmouseover=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseover');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onmouseup events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onmouseup=${pass}></input>`;

    raiseEvent(res, 'mouseup');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onmouseup events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onmouseup=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseup');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onmouseup events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onmouseup=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'mouseup');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onreset events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onreset=${pass}></input>`;

    raiseEvent(res, 'reset');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onreset events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onreset=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'reset');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onreset events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onreset=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'reset');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onresize events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onresize=${pass}></input>`;

    raiseEvent(res, 'resize');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onresize events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onresize=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'resize');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onresize events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onresize=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'resize');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onscroll events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onscroll=${pass}></input>`;

    raiseEvent(res, 'scroll');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onscroll events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onscroll=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'scroll');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onscroll events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onscroll=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'scroll');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onselect events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onselect=${pass}></input>`;

    raiseEvent(res, 'select');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onselect events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onselect=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'select');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onselect events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onselect=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'select');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should have onsubmit events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input onsubmit=${pass}></input>`;

    raiseEvent(res, 'submit');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onsubmit events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input onsubmit=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'submit');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should copy onsubmit events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input onsubmit=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'submit');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should have ontouchcancel events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ontouchcancel=${pass}></input>`;

    raiseEvent(res, 'touchcancel');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ontouchcancel events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ontouchcancel=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchcancel');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should copy ontouchcancel events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ontouchcancel=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchcancel');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should have ontouchend events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ontouchend=${pass}></input>`;

    raiseEvent(res, 'touchend');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ontouchend events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ontouchend=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchend');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should copy ontouchend events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ontouchend=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchend');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should have ontouchmove events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ontouchmove=${pass}></input>`;

    raiseEvent(res, 'touchmove');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ontouchmove events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ontouchmove=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchmove');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should copy ontouchmove events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ontouchmove=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchmove');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should have ontouchstart events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<input ontouchstart=${pass}></input>`;

    raiseEvent(res, 'touchstart');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy ontouchstart events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<input ontouchstart=${fail}></input>`;
    const b = html`<input></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchstart');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should copy ontouchstart events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<input></input>`;
    const b = html`<input ontouchstart=${pass}></input>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'touchstart');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should have onunload events (html attribute) ', t => {
    t.plan(1);
    let expectationMet = false;
    const res = html`<body onunload=${pass}></body>`;

    raiseEvent(res, 'unload');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.test('should not copy onunload events', t => {
    t.plan(1);
    let expectationMet = true;
    const a = html`<body onunload=${fail}></body>`;
    const b = html`<body></body>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'unload');

    function fail(e) {
      e.preventDefault();
      expectationMet = false;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });

  await t.todo('should copy onunload events (html attribute)', t => {
    t.plan(1);
    let expectationMet = false;
    const a = html`<body></body>`;
    const b = html`<body onunload=${pass}></body>`;
    const res = morph(a, b, { events });

    raiseEvent(res, 'unload');

    function pass(e) {
      e.preventDefault();
      expectationMet = true;
    }

    t.assert.equal(expectationMet, true, 'result was expected');
  });
});
