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
