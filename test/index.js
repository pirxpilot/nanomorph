import test from 'node:test';
import nanomorph from '../index.js';

test('nanomorph', async t => {
  await t.test('should assert input types', t => {
    t.plan(2);
    t.assert.throws(nanomorph, /a/);
    t.assert.throws(nanomorph.bind(null, {}), /b/);
  });
});
