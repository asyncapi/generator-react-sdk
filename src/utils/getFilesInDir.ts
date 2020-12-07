
import Path from 'path';
import fs from 'fs';
import { promisify } from 'util';
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
        } else {
            const ext = filename.split('.').pop() || '';
            if (ALLOWED_EXTS.includes(ext)) {
                files.push(res);
            }
        }
    }
    const resolveFilenameCallback = (filename: string) => {
        return Path.resolve(dir, filename); 
    }
    files = files.map(resolveFilenameCallback);
    dirs = dirs.map(resolveFilenameCallback);
    return new GetFilesResponse(files, dirs);
}