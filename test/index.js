const tape = require('tape');

const abstractMorph = require('./diff');
const nanomorph = require('../');
const abstractMorphEvents = require('./events');

if (!module.parent) {
  require('./fuzz');
  specificTests(nanomorph);
  abstractMorph(nanomorph);
  abstractMorphEvents(nanomorph);
} else {
  module.exports = abstractMorph;
}

function specificTests(morph) {
  tape('nanomorph', function (t) {
    t.test('should assert input types', function (t) {
      t.plan(2);
      t.throws(morph, /a/);
      t.throws(morph.bind(null, {}), /b/);
    });
    t.end();
  });
}
