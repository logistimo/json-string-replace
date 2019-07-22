'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.json_string_replace = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  replacement: function (test) {
    test.expect(1);

      var actual = grunt.file.read('test/fixtures/testing');
    test.equal(actual, '{"key":"Tasting","key2":"11,222,333"}', 'Expected does not match');

    test.done();
  },
  props_replacement: function(test){
      test.expect(1);


      var actual = grunt.file.read('test/fixtures/123');
      var expected = grunt.file.read('test/expected/123_default');
      test.equal(actual, expected, 'matches');

      test.done();
  }
};
