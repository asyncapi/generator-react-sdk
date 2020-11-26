function normalizeProps(props: any = {}) {
  const children = props.children;
  let newChildren = render(children);

  return { 
    ...props, 
    children: newChildren,
    $$children: children,
  }
}

function createElement(element: any): any {
  if (typeof element.type === 'string') {
    // HTML (also not standard) tags case
    throw new Error("HTML tags is not supported yet!");
  } else if (typeof element.type === 'symbol') {
    // internal React types like Fragments, Portal etc. We skip them.
    return render(element.props.children);
  } else if (typeof element.type === 'function') {
    const { type, props } = element;
    const prototype = type.prototype;

    // Class component case
    if (prototype && typeof prototype.isReactComponent === "object") {
      const clazzComp = new type(normalizeProps(props));
      return createElement(clazzComp.render());
    } 
    // Function component case
    return createElement(type(normalizeProps(props)));
  }
  return element || "";
}

export function render(node: React.ReactNode) {
  let content = "";
  const typeOf = typeof node;
  if (typeOf === 'string') {
    content += node;
  } else if (Array.isArray(node)) {
    content += node.map(child => {
      const childValue = createElement(child);
      return render(childValue);
    }).join("");
  } else {
    content += createElement(node);
  }
  return content || "";
}

export function renderTemplate(element: any = {}) {
  const { type, props = {} } = element;

  if (typeof type !== "function" && type.name !== "File") {
    throw new Error("File is required as first node in template!");
  }
  if (props.name === undefined) {
    throw new Error("`name` prop in File component is required!");
  }

  return {
    metadata: {
      name: props.name,
      permissions: props.permissions,
    },
    content: render(props.children),
  }
}
