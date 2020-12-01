import React from "react";
import { render } from "./renderer";
import Path from 'path';
import Fs from 'fs';
import { transpileFiles } from "./transpiler";

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
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const outputDir = Path.resolve(dir, '../__transpiled');
  //compile the template dir first
  await transpileFiles(filepath, outputDir, {recursive: true});

  
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
