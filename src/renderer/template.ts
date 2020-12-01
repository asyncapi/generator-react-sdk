import React from "react";
import { TemplateRenderResult } from "../types";
import { render } from "./renderer";

/**
 * Imports a given file and return the imported component
 * 
 * @param filepath to import
 */
function importComponent(filepath: string, context: any): Promise<React.ReactElement> {
  return new Promise((resolve) => {
    import(filepath).then(component => { resolve(component.default(context)) })
  })
}

/**
 * render a file with react. This function automatically transforms jsx to js before importing the component.
 * 
 * @param filepath file to render
 */
export async function renderTemplate(filepath: string, context: any, debug: boolean = false) {
  const { type, props = {} } = await importComponent(filepath, context);

  if (typeof type !== "function" || type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }

  return new TemplateRenderResult(render(props.children), {
    fileName: props.fileName,
    permissions: props.permissions,
  });
}
