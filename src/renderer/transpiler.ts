

import Path from 'path';
import fs from 'fs';
import { promisify } from 'util';
const ROOT_DIR = Path.resolve(__dirname, '../..');
import { rollup, RollupBuild } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Options for transpiling files.
 */
export class TranspileFilesOptions {
    /**
     * Should all files in a directory including those in subdirectories be included
     */
    recursive: boolean = false
}

/**
 * Function which finds all the files in directories
 * 
 * @param dir directory to find files in.
 * @param includeSubDirs should the function iterate through subdirectories to search for files?
 */
async function getFilesInDir(dir: string, includeSubDirs: boolean) {
    const subdirs = await readdir(dir);
    const files: string[][] = await Promise.all(subdirs.map(async (subdir: string) => {
        const res = Path.resolve(dir, subdir);
        const isDir = (await stat(res)).isDirectory(); 
        if(!includeSubDirs && isDir) return [];
        return isDir ? getFilesInDir(res, includeSubDirs) : [res];
    }));
    return files.reduce((a, f) => a.concat(f), []);
}


/**
 * Transpile files in directory and write it to a directory, if no errors are thrown it completed successfully.
 * 
 * @param directory to transpile.
 * @param outputDir to write the transpiled files to.
 * @param options any extra options that should be passed.
 */
export async function transpileFiles(directory: string, outputDir: string, options?: TranspileFilesOptions) {
    const parsedFile = Path.parse(directory)
    const dir = parsedFile.dir
    const files = await getFilesInDir(dir, options !== undefined ? options.recursive : false);
    if(files.length == 0) throw new Error("No files to transpile?")

    let bundles: RollupBuild;
    try {
        bundles = await rollup({
            input: files,
            plugins: [
                babel({
                    cwd: ROOT_DIR,
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                }),
                commonjs(),
            ]
        })
    } catch (e) {
        const transpileError = new Error("Could not transpile one or more files in the directory...");
        transpileError.stack = e;
        throw transpileError;
    }
    try {
        await bundles.write({
            format: "commonjs",
            sourcemap: true,
            dir: outputDir
        })
    } catch (e) {
        const transpileSaveError = new Error("Could not save one or more transpiled files in the directory...");
        transpileSaveError.stack = e;
        throw transpileSaveError;
    }
}