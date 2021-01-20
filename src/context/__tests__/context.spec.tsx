import React from 'react';
import { createContext, useContext } from "../";
import { render } from "../..";

describe('Context', () => {
  test('should context works in basic case', () => {
    interface Values {
      prop: string
    }
    const Context = createContext<Values>();

    function Component() {
      const ctx = useContext(Context);
      return <>{ctx.prop}</>;
    }

    const template = (
      <Context.Provider value={{ prop: "someValue" }}>
        <Component />
      </Context.Provider>
    );

    const content = render(template);
    expect(content).toEqual("someValue");
  });

  test('should devaultValue works', () => {
    interface Values {
      prop: string
    }
    const Context = createContext<Values>({ prop: "default" });

    function Component() {
      const ctx = useContext(Context);
      return <>{ctx.prop}</>;
    }

    const content = render(<Component />);
    expect(content).toEqual("default");
  });

  test('should context works in complex JSX stucture', () => {
    interface Values {
      prop: string
    }
    const ParentContext = createContext<Values>();
    const ChildContext = createContext<Values>();

    function Component() {
      const parent = useContext(ParentContext);
      const child = useContext(ChildContext);

      return <>{child.prop} {parent.prop}</>;
    }

    const template = (
      <ParentContext.Provider value={{ prop: "parent" }}>
        <ChildContext.Provider value={{ prop: "child" }}>
          <Component />
        </ChildContext.Provider>
      </ParentContext.Provider>
    );

    const content = render(template);
    expect(content).toEqual("child parent");
  });

  test('should ovveride works', () => {
    interface Values {
      prop: string
    }
    const Context = createContext<Values>();

    function Component() {
      const ctx = useContext(Context);
      return <>{ctx.prop}</>;
    }

    const template = (
      <Context.Provider value={{ prop: "parent" }}>
        <Context.Provider value={{ prop: "child" }}>
          <Component />
        </Context.Provider>
      </Context.Provider>
    );

    const content = render(template);
    expect(content).toEqual("child");
  });
});
