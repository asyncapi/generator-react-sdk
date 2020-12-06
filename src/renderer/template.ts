import React from "react";

import { render } from "./renderer";
import { File } from "../components";
import { TemplateContext, TemplateRenderResult } from "../types";

/**
 * render a file with react. This function automatically transforms jsx to js before importing the component.
 * 
 * @param filepath the path to file to render
 */
export async function renderTemplate(filepath: string, context: TemplateContext): Promise<TemplateRenderResult | Array<TemplateRenderResult> | undefined> {
  const data = await importComponent(filepath, context);

  // undefined, null etc. cases
  if (!data) {
    return undefined;
  }

  // array of File components case
  if (Array.isArray(data)) {
    const files = data.map(singleFile => renderFile(singleFile)).filter(Boolean) as Array<TemplateRenderResult>;
    if (!files.length) return undefined;
    return files;
  }
  // File component as root case
  return renderFile(data);
}

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
 * Render a single File component.
 * 
 * @private
 * @param {React.ReactElement} file to import
 */
function renderFile(file: React.ReactElement): TemplateRenderResult | undefined {
  if (typeof file !== "object") {
    return undefined;
  }
  const { type, props = {} } = file;

  // if no File component is found as root, don't render it.
  if (type !== File) {
    return undefined;
  }

  return {
    content: render(props.children),
    metadata: {
      fileName: props.name,
      permissions: props.permissions,
    }
  };
}
