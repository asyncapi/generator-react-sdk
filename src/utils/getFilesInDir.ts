import Path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { isJsFile } from '../utils';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const ALLOWED_EXTS = ['js', 'jsx', 'cjs'];

class GetFilesResponse{
    files: string[];
    dirs: string[];
    constructor(files: string[], dirs: string[]){
        this.files = files;
        this.dirs = dirs;
    }
}

/**
 * Function which finds all the files in directories
 * 
 * @param dir directory to find files in.
 * @param includeSubDirs should the function iterate through subdirectories to search for files?
 */
export async function getFilesInDir(dir: string){
    const allFiles = await readdir(dir);
    let files: string[] = [];
    let dirs: string[] = [];
    for (const filename of allFiles) {
        const res = Path.resolve(dir, filename);
        const stats = await stat(res);
        if (stats.isDirectory()) {
            dirs.push(res)
        } else if (isJsFile(filename)) {
            files.push(res);
        }
    }
    const resolveFilenameCallback = (filename: string) => {
        return Path.resolve(dir, filename); 
    }
    files = files.map(resolveFilenameCallback);
    dirs = dirs.map(resolveFilenameCallback);
    return new GetFilesResponse(files, dirs);
}