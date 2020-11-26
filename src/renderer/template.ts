import { render } from "./renderer";

/**
 * Renders the given template to string
 * @param {React.ReactElement} template given template
 */
export function renderTemplate(template: React.ReactElement) {
  const { type, props = {} } = template;

  if (typeof type !== "function" || type.name !== "File") {
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
