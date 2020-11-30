import React from "react";
import { render } from "./renderer";
import Path from 'path';
import Fs from 'fs';
import {transform} from '@babel/core';
const ROOT_DIR = Path.resolve(__dirname, '../..');
import {rollup} from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
/**
 * Imports a given file and return the imported component
 * 
 * @param filepath to import
 */
function importComponent(filepath:string): Promise<React.ReactElement> {
  return new Promise((resolve) => {
    import(filepath).then(component => { resolve(component.default()) })
  })
}

async function transpileFilesRollup(filepath: string, outputDir: string){
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const files = Fs.readdirSync(dir);
  if (!Fs.existsSync(outputDir)){
    Fs.mkdirSync(outputDir);
  }
  var filePaths = files.map((value => {
    return Path.resolve(dir, value)
  }));
  try{
    const bundle = await rollup({
      input: filePaths,
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

    await bundle.write({
      format: "commonjs",
      sourcemap: true,
      dir: outputDir
    })

  }catch(e) {
    console.log(e);
  }

}

function transpileFilesBabel(filepath: string, outputDir: string){
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const files = Fs.readdirSync(dir);
  if (!Fs.existsSync(outputDir)){
    Fs.mkdirSync(outputDir);
  }

  files.forEach(file => {
    const filePathString = Path.resolve(dir, file)
    const filePath = Path.parse(filePathString);
    const filecontent = Fs.readFileSync(filePathString);
    const filecontentString = filecontent.toString();
    var babelTransformed = transform(filecontentString, {
      cwd: ROOT_DIR,
      sourceMaps: "inline",
      sourceRoot: dir,
      plugins: [
        "source-map-support"
      ],
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      sourceFileName: filePath.base
    })
    const outputFile = Path.resolve(outputDir, filePath.base);
    const outputContent = String(babelTransformed?.code);
    Fs.writeFileSync(outputFile, outputContent)
  })
}

/**
 * render a file with react. This function automatically transforms jsx to js before importing the component.
 * 
 * @param filepath file to render
 */
export async function renderTemplate(filepath: string, context: any, debug: boolean = false) {
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const outputDir = Path.resolve(dir, '../__transpiled');
  //compile the template dir first
  await transpileFilesRollup(filepath, outputDir);

  
  const inputFile = Path.resolve(outputDir, parsedFile.base);
  const { type, props = {} } = await importComponent(inputFile);

  if (typeof type !== "function" || type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }
  
  if (debug !== true) Fs.rmdirSync(outputDir, { recursive: true });


  return {
    metadata: {
      name: props.name,
      permissions: props.permissions,
    },
    content: render(props.children),
  }
}
