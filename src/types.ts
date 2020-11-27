import React from "react";

export type PropsWithChildrenContent<P> = P & {
  childrenContent?: string;
}

export type FC<P = {}> = FunctionComponent<P>;
export type FunctionComponent<P = {}> = React.FunctionComponent<PropsWithChildrenContent<P>>;
export class Component<P = {}> extends React.Component<PropsWithChildrenContent<P>> {}
