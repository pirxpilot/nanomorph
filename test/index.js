require('jsdom-global')();

const tape = require('tape');

const nanomorph = require('../');

const abstractMorph = require('./diff');
const abstractMorphEvents = require('./events');

require('./fuzz');

specificTests(nanomorph);
abstractMorph(nanomorph);
abstractMorphEvents(nanomorph);

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
