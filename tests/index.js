var Version = require('../version.js');
var test = require('tap').test;

test('Basic tests', function (t) {
    var v1 = new Version('7.1');
    var v2 = new Version('8.0.1');
    t.ok(v1.lt(v2), 'v1 is less than v2');
    t.ok(v2.gt(v1), 'v2 is greater than v1');
    t.equal(v1.toString(), '7.1.0', 'toString() returns 7.1.0');
    v2.major = 7;
    v2.minor = 1;
    v2.patch = 0;
    t.ok(v1.eq(v2), 'v1 now equals v2');
    t.end();
});
