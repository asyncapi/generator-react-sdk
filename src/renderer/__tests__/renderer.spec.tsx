import React from 'react';
import { render } from "../..";

describe('Renderer', () => {
  test('should render works when element is string', () => {
    const content = render("Test 1");
    expect(content).toEqual("Test 1");
  });

  test('should render works when element is a Funcion Component', () => {
    function Test() {
      return <>Test 2</>
    }

    const content = render(<Test />);
    expect(content).toEqual("Test 2");
  });

  test('should render works when element is a Class Component', () => {
    class Test extends React.Component {
      constructor(props: any) { super(props) } 
      
      render() {
        return <>Test 3</>
      }
    }

    const content = render(<Test />);
    expect(content).toEqual("Test 3");
  });

  test('should render works with nested hierarchy', () => {
    function NestedComponent() {
      return <>Nested Component</>
    }

    function FunctionComponent() {
      return <>Function Component <NestedComponent />{"\n"}</>
    }

    class ClassComponent extends React.Component {
      constructor(props: any) { super(props) } 
      
      render() {
        return <>Class Component{"\n"}</>
      }
    }

    const content = render(
      <>
        some inlined text{"\n"}
        <FunctionComponent />
        <ClassComponent />
      </>
    );
    expect(content).toEqual("some inlined text\nFunction Component Nested Component\nClass Component\n");
  });

  test('should render works with props', () => {
    function Test({ someProp }: { someProp?: string }) {
      if (!someProp) {
        return <Test someProp="Nested prop" />;
      }
      
      return <>{someProp}</>
    }

    const content = render(<Test />);
    expect(content).toEqual("Nested prop");
  });

  test('should render works with null as returned value', () => {
    function Test() {
      return null;
    }

    const content = render(<Test />);
    expect(content).toEqual("");
  });

  test('should render works nested null value', () => {
    function NullComponent() {
      return null;
    }

    function NestedComponent() {
      return (
        <>
          <NullComponent />
          some text
        </>
      );
    }

    function Component() {
      return (
        <>
          <NullComponent />
          <NestedComponent />
          <NullComponent />
        </>
      );
    }

    const content = render(<Component />);
    expect(content).toEqual("some text");
  });
});
