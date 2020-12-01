# generator-react-sdk
React SDK



## The Transpile Process

The SDK has a custom transpiler which ensures that any directory are transpiled using [rollup](https://www.npmjs.com/package/rollup). Rollup helps bundling all dependencies and transpile them into CommonJS modules. This is required because this library will be used through NodeJS which does not understand these new modules natively and we do not want to limit the developer in which syntax they prefer nor how they want to separate code. 


## <a name="rendering_process"></a>The Rendering Process



### The debug flag
When rendering you have the option of passing a `debug` flag which does

* Does not remove the transpiled files after the rendering process is done.


