<h5 align="center">
  <br>
  <a href="https://www.asyncapi.org"><img src="https://github.com/asyncapi/parser-nodejs/raw/master/assets/logo.png" alt="AsyncAPI logo" width="200"></a>
  <br>
  AsyncAPI React SDK
</h5>
<p align="center">
  <em>The official SDK to use React in your template</em>
</p>

## Overview

## Installation

Run this command to install the SDK in your project:

```bash
npm install --save @asyncapi/generator-react-sdk
```

## How it works

### The Transpile Process

The SDK has a custom transpiler which ensures that any directory are transpiled using [Rollup](https://www.npmjs.com/package/rollup). Rollup helps bundling all dependencies and transpile them into CommonJS modules. This is required because this library will be used through NodeJS which does not understand these new modules natively and we do not want to limit the developer in which syntax they prefer nor how they want to separate code. 

### The Rendering Process



### The debug flag

When rendering you have the option of passing a `debug` flag which does

* Does not remove the transpiled files after the rendering process is done.

## Development

1. Setup project by installing dependencies `npm install`
2. Write code and tests.
3. Make sure all tests pass `npm test`
4. Make sure code is well formatted and secure `npm run lint`

## Contributing

Read [CONTRIBUTING](https://github.com/asyncapi/.github/blob/master/CONTRIBUTING.md) guide.
