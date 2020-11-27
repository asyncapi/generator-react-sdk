import React from "react";
import { render } from "./renderer";
import Path from 'path';
import Fs from 'fs';
import {transform} from '@babel/core';
function importComponent(filepath:string): Promise<React.ReactElement> {
  return new Promise((resolve) => {
    import(filepath).then(component => { resolve(component.default()) })
  })
}

/**
 * Renders the given template to string
 * @param {React.ReactElement} template given template
 */
export async function renderTemplate(filepath: string, templatedir: string) {

  //compile the template dir first
  const parsedFile = Path.parse(filepath)
  const dir = parsedFile.dir
  const files = Fs.readdirSync(dir);
  const outputDir = Path.resolve(dir, 'output');
  const inputFile = Path.resolve(outputDir, parsedFile.base);
  if (!Fs.existsSync(outputDir)){
    Fs.mkdirSync(outputDir);
  }
  files.forEach(file => {
    const filecontent = Fs.readFileSync(file);
    var babelTransformed = transform(filecontent.toString(), {
      cwd: templatedir,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ]
    })

    Fs.writeFileSync(Path.resolve(outputDir, Path.parse(file).base), String(babelTransformed?.code))
  })

  const { type, props = {} } = await importComponent(inputFile);

  if (typeof type !== "function" || type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }


  return {
    metadata: {
      name: props.name,
      permissions: props.permissions,
    },
    content: render(props.children),
  }
}
