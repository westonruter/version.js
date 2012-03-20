# version.js

I couldn't find any elegant way to represent software version numbers (version
names) in JavaScript. So I set out to create a `Version` object which can be
used to represent a version and compare it with other versions.

Works either in the browser or in as a Node module.

## Examples

```js
var v1 = new Version('7.1');
var v2 = new Version('8.0.1');
assert(v1.lt(v2) === true);
assert(v2.gt(v2) === true);
assert(v1.toString() === '7.1.0');
v2.major = 7;
v2.minor = 1;
v2.patch = 0;
assert(v1.eq(v2) === true);
```

## Tests

Extensive [tests](blob/master/tests/index.js), run via `npm test`.
