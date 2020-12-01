import React from "react";

import { render } from "./renderer";
import { TemplateContext, TemplateRenderResult } from "../types";

/**
 * Imports a given file and return the imported component
 * 
 * @private
 * @param filepath to import
 */
function importComponent(filepath: string, context: TemplateContext): Promise<React.ReactElement> {
  return new Promise((resolve) => {
    import(filepath).then(component => { resolve(component.default(context)) })
  })
}

/**
 * render a file with react. This function automatically transforms jsx to js before importing the component.
 * 
 * @param filepath the path to file to render
 */
export async function renderTemplate(filepath: string, context: TemplateContext): Promise<TemplateRenderResult> {
  const { type, props = {} } = await importComponent(filepath, context);

  if (typeof type !== "function" || type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }

  return {
    content: render(props.children),
    metadata: {
      fileName: props.fileName,
      permissions: props.permissions,
    }
  };
}
