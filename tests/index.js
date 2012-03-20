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

test('Testing lt and gt', function (t) {
    var v1 = new Version('11.0.1');
    var v2 = new Version([2, 1]);
    t.ok(v1.gt(v2), 'v1 is greater than v2');
    t.ok(v2.lt(v1), 'v2 is less than v1');
    v1.major -= 10;
    t.ok(v1.lt(v2), 'v1 is now less than v2');
    v1.set(v2);
    t.ok(v1.eq(v2), 'v1 and v2 are now the same');
    t.end();
});

test('Testing eq', function (t) {
    var v1 = new Version('1.2.3');
    var v2 = new Version('1.2.3');
    t.ok(v1.eq(v2), 'v1.eq(v2)');
    t.equal(v1.toString(), String(v2), '(str)v1 == (str)v2');
    t.end();
});

test('Creating a version from a version', function (t) {
    var v1 = new Version('1.2.3');
    var v2 = new Version(v1);
    t.ok(v1.eq(v2), 'v1 and v2 are the same');
    t.end();
});

test('Creating an empty version', function (t) {
    var v = new Version();
    t.equal(v.major, 0, 'major is 0');
    t.equal(v.minor, 0, 'minor is 0');
    t.equal(v.patch, 0, 'patch is 0');
    t.equal(v.toString(), '0.0.0', 'Version is 0.0.0');
    t.end();
});

test('Creating version from array', function (t) {
    var v = new Version([1,2,300]);
    t.equal(v.major, 1, 'Major is 1');
    t.equal(v.minor, 2, 'Minor is 2');
    t.equal(v.patch, 300, 'Patch is 300');
    t.equal(v.toString(), '1.2.300', 'Version is 1.2.300');
    t.end();
});

test('Testing valueOf()', function (t) {
    var v = new Version([20,4,1]);
    t.ok(v.valueOf() instanceof Array, 'Version.valueOf() is an array');
    t.deepEqual(v.valueOf(), [20,4,1], 'ValueOf() is same array values');
    v = new Version(v.valueOf());
    t.ok(v.eq(new Version('20.4.1')), 'Instance is equal');
    t.end();
});

test('Re-setting version', function (t) {
    var v = new Version('1.2.3');
    t.equal(v.major, 1, 'Major is 1');
    t.equal(v.patch, 3, 'Patch is 3');
    v.set(v.valueOf().reverse());
    t.equal(v.major, 3, 'Major is 3');
    t.equal(v.patch, 1, 'Major is 1');
    v.set();
    t.equal(v.toString(), '0.0.0');
    t.end();
});

test('Constructing from number', function (t) {
    var v = new Version(1.5);
    t.equal(v.major, 1, 'Major is 1');
    t.equal(v.minor, 5, 'Patch is 5');
    t.equal(v.patch, 0, 'Patch is 0');
    t.equal(v.toString(), '1.5.0', 'Version is 1.5.0');

    try {
        v.set(-1.2);
        throw new Error("Failed to die");
    }
    catch(e){
        t.equal(e.message, 'Expected number to be positive');
    }

    t.end();
});

test('Constructing from bad values', function (t) {
    var v = new Version();

    try {
        v.set(new Date());
        throw new Error("Failed to die");
    }
    catch(e1){
        t.equal(e1.message, 'Unexpected value supplied when setting version');
    }

    try {
        v.set({"foo":"bar"});
        throw new Error("Failed to die");
    }
    catch(e2){
        t.equal(e2.message, 'Unexpected value supplied when setting version');
    }

    t.end();
});

test('Constructing from an object', function (t) {
    var v = new Version();

    v.set({major:3});
    t.deepEquals(v.valueOf(), [3,0,0]);

    v.set({minor:2});
    t.deepEquals(v.valueOf(), [0,2,0]);

    v.set({patch:5});
    t.deepEquals(v.valueOf(), [0,0,5]);

    v.set({major:5, patch:2});
    t.deepEquals(v.valueOf(), [5,0,2]);

    v.set({minor:2, patch:4});
    t.deepEquals(v.valueOf(), [0,2,4]);

    v.set({major:10, minor:3});
    t.deepEquals(v.valueOf(), [10,3,0]);

    v.set({major:10, foo:"bar", baz:"qux"});
    t.deepEquals(v.valueOf(), [10,0,0]);

    t.end();
});
