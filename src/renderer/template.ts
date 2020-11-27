import React from "react";
import { render } from "./renderer";
import Path from 'path';
import Fs from 'fs';
import {transform} from '@babel/core';

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
 * @param workingDirectory for babel to transpile files
 */
export async function renderTemplate(filepath: string, workingDirectory: string) {

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
    const filecontent = Fs.readFileSync(Path.resolve(dir, file));
    const filecontentString = filecontent.toString();
    var babelTransformed = transform(filecontentString, {
      cwd: workingDirectory,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ]
    })
    const outputFile = Path.resolve(outputDir, Path.parse(file).base);
    const outputContent = String(babelTransformed?.code);
    Fs.writeFileSync(outputFile, outputContent)
  })

  const { type, props = {} } = await importComponent(inputFile);

  if (typeof type !== "function" || type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }
  
  Fs.rmdirSync(outputDir, { recursive: true });


  return {
    metadata: {
      name: props.name,
      permissions: props.permissions,
    },
    content: render(props.children),
  }
}
