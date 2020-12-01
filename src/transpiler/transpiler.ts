import Path from 'path';

import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import { getFilesInDir } from '../utils';
import { TranspileFilesOptions } from '../types';

const ROOT_DIR = Path.resolve(__dirname, '../..');

/**
 * Transpile files in directory and write it to a directory, if no errors are thrown it completed successfully.
 * 
 * @param directory to transpile.
 * @param outputDir to write the transpiled files to.
 * @param options any extra options that should be passed.
 */
export async function transpileFiles(directory: string, outputDir: string, options?: TranspileFilesOptions) {
    const {files, dirs} = await getFilesInDir(directory);
    if(files.length == 0) throw new Error("No files to transpile?")

    const bundles = await rollup({
        input: files,
        plugins: [
            babel({
                cwd: ROOT_DIR,
                babelHelpers: "bundled",
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ],
            }),
            commonjs(),
        ]
    })
    await bundles.write({
        format: "commonjs",
        sourcemap: true,
        dir: outputDir,
        exports: "auto"
    })

    if(options?.recursive === true && dirs.length !== 0){
        for (const subdir of dirs) {
            const subdirPath = Path.parse(subdir);
            await transpileFiles(subdir, Path.resolve(outputDir, subdirPath.base), options);
        }
    }
}
