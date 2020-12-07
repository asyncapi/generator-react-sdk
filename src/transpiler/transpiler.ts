import Path from 'path';

import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import { getFilesInDir } from '../utils';
import { TranspileFilesOptions } from '../types';

const ROOT_DIR = Path.resolve(__dirname, '../..');

/**
 * Transpile files in a given directory (and sub directory if recursive option are passed) and write it to an output directory, if no errors are thrown it completed successfully.
 * 
 * @param directory to transpile.
 * @param outputDir to write the transpiled files to.
 * @param options any extra options that should be passed.
 */
export async function transpileFiles(directory: string, outputDir: string, options?: TranspileFilesOptions) {
    const {files, dirs} = await getFilesInDir(directory);
    if(files.length > 0){

        /**
         * WHEN ADDING PLUGINS to transform the input keep in mind that 
         * IF any of these changes the actual original content in some way
         * the output is not able to produce accurate source map to the original file.
         * 
         * An example of this is using the `sourceMaps: 'inline'` configuration for the babel plugin.
         */
        const bundles = await rollup({
            input: files,
            onwarn: ()=>{},
            plugins: [
                babel({
                    cwd: ROOT_DIR,
                    babelHelpers: "bundled",
                    plugins: [
                        "source-map-support"
                    ],
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                })
            ]
        })
        await bundles.write({
            format: "commonjs",
            sourcemap: true,
            dir: outputDir,
            exports: "auto"
        })
    }

    // Check if we should transpile all subdirs
    if(options?.recursive === true && dirs.length > 0){
        for (const subdir of dirs) {
            const subdirPath = Path.parse(subdir);
            await transpileFiles(subdir, Path.resolve(outputDir, subdirPath.base), options);
        }
    }
}
