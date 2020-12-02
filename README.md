# generator-react-sdk

React SDK

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


