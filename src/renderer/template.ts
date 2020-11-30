import React from "react";
import { render } from "./renderer";
import Path from 'path';
import Fs from 'fs';
import {transform} from '@babel/core';
const ROOT_DIR = Path.resolve(__dirname, '../..');

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

/**
 * render a file with react. This function automatically transforms jsx to js before importing the component.
 * 
 * @param filepath file to render
 */
export async function renderTemplate(filepath: string, context: any, debug: boolean = false) {

  //compile the template dir first
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const files = Fs.readdirSync(dir);
  const outputDir = Path.resolve(dir, '../__transpiled');
  const inputFile = Path.resolve(outputDir, parsedFile.base);
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
