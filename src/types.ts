import React from "react";

export type PropsWithChildrenContent<P> = P & {
  childrenContent?: string;
}

export type FC<P = {}> = FunctionComponent<P>;
export type FunctionComponent<P = {}> = React.FunctionComponent<PropsWithChildrenContent<P>>;
export class Component<P = {}> extends React.Component<PropsWithChildrenContent<P>> {}



/**
 * Options for transpiling files.
 */
export class TranspileFilesOptions {
  /**
   * Should all files in a directory including those in subdirectories be included
   */
  recursive: boolean = false
}

export class TemplateRenderMetadata {
  name?: string;
  permissions?: string;
  constructor(name: (string|undefined), permissions: (string|undefined)){
    this.name = name;
    this.permissions = permissions;
  }
}
export class TemplateRenderResult {
  metadata: TemplateRenderMetadata;
  content: string;
  constructor(content: string, metadata: TemplateRenderMetadata){
    this.content = content; 
    this.metadata = metadata;
  }
}