[![npm](https://img.shields.io/npm/v/exceptions-with-cause?style=for-the-badge)](https://www.npmjs.com/package/exceptions-with-cause) ![npm type definitions](https://img.shields.io/npm/types/exceptions-with-cause?style=for-the-badge) ![npm bundle size](https://img.shields.io/bundlephobia/min/exceptions-with-cause?style=for-the-badge)
# `exceptions-with-cause`

## What?
The `exceptions-with-cause` package is a simple utility that provides java-style causes for errors in javascript. This is useful when catching and throwing errors upwards where you still want to keep what caused the original error.

## Why?
Let's say you have a function `performTask` which when you run it throws this error:
```
TypeError: Cannot convert undefined or null to object
    at Function.entries (<anonymous>)
    at performTask (/Users/user/project/index.js:5:10)
    at main (/Users/user/project/index.js:9:3)
```
This error can be useful in the sense that it is low level, it tells you exactly what went wrong and where, but unfortunately leaves out the larger context of when and why the function was called.

You could try and remedy this by catching any error thrown by `performTask` and attach additional information there.
```js
try {
  performTask();
}
catch (error) {
  throw new Error(`Request failed because of error in "performTask": ${error.message}`);
}
```
When running this we get:
```
Error: Request failed because of error in "performTask": Cannot convert undefined or null to object
    at main (/Users/user/project/index.js:13:11)
    at Object.<anonymous> (/Users/user/project/index.js:17:1)
```
With this we can quickly see the program was trying to make a request when it was calling `performTask`, however we lose the stack trace from before making it much harder to find the actual cause of the error.

With the `exceptions-with-cause` package we can get the best of both worlds by attaching a cause to our error:
```
Error: Request failed because of error in "performTask"
    at main (/Users/user/project/index.js:13:11)
    at Object.<anonymous> (/Users/user/project/index.js:17:1)
Caused by: TypeError: Cannot convert undefined or null to object
    at Function.entries (<anonymous>)
    at performTask (/Users/user/project/index.js:5:10)
    at main (/Users/user/project/index.js:9:3)
```

## How?
Like this:
```js
import Exception from 'exceptions-with-cause'; // or use require if using commonjs

try {
  // Something goes wrong in here, for example:
  JSON.parse(undefined);
}
catch (error) {
  throw new Exception('Something descriptive of what the code was doing', error);
}
```
Which will result in this error:
```
Exception: Something descriptive of what the code was doing
    at Object.<anonymous> (/Users/user/project/index.js:8:9)
Caused by: SyntaxError: Unexpected token u in JSON at position 0
    at JSON.parse (<anonymous>)
    at Object.<anonymous> (/Users/user/project/index.js:5:8)
```

### Retrieving the cause
It is also possible to retrieve the cause object from an exception if needed, like this:
```js
const ex = new Exception('Error', { example: 123 });

const cause = Exception.cause(ex); // Will return { example: 123 }
```
