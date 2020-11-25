
import {withIndendation} from './Indent';
import { IndentationTypes } from './enums/IndentationTypes';
import {withNewLines} from './utils/NewLines';
import { IndentationPropTypes } from './utils/PropTypes';

/**
 * Component is for defining a group of text which should be rendered on the same line.
 *
 * @component
 * @example
 * const size = 4
 * const type = IndentationTypes.SPACES
 * return (
 *   <Text size={size} type={type}>Test</Text>
 * )
 */
const Text = ({ indent = 0, type = IndentationTypes.SPACES, newLines = 1, children }) => {
  const contentWithLines = withNewLines(children, newLines);
  return withIndendation(contentWithLines, indent, type);
};

Text.propTypes = {
  ...IndentationPropTypes
};
export default Text;