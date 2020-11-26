import React from "react";

export type PropsWithChildren<P> = P & { 
  $$children?: React.ReactNode,
}

export type FC<P = {}> = FunctionComponent<P>;
export type FunctionComponent<P = {}> = React.FunctionComponent<PropsWithChildren<P>>;
export class Component<P = {}> extends React.Component<PropsWithChildren<P>> {}
