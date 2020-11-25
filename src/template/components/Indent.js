import { IndentationPropTypes } from './utils/PropTypes';
import { IndentationTypes } from './enums/IndentationTypes';
/**
 * Component is for wrapping multiple components and apply an indentation on those. 
 * 
 * It supports any form of nested components as well, meaning you can have as many nested `Indent` components as you would like.
 * 
 * @component
 * @example
 * const size = 4
 * const type = IndentationTypes.SPACES
 * return (
 *   <Indent size={size} type={type}>Test</Indent>
 * )
 */
const Indent = ({ size = '0', type = IndentationTypes.SPACES, children }) => {
  return withIndendation(children, size, type);
};

Indent.propTypes = {
  ...IndentationPropTypes
};
export default Indent;

/**
 * Get the indendation string based on how many and which type of indentation are requested.
 * @private
 * @param {Number} size the number of indendations to use
 * @param {IndentationTypes} type the type of indendations to use 
 */
export const getIndentation = (size, type) => {
  const whitespaceChar = type === IndentationTypes.SPACES ? ' ' : '\t';
  if (size !== undefined) {
    const numberSize = Number(size);
    const arrayToUse = Array.from(Array(numberSize).keys());
    return arrayToUse.reduce((accumulator) => {
      return `${accumulator === 0 ? whitespaceChar : accumulator}${whitespaceChar}`;
    });
  } 
  return '';
};
/**
 * Ensures indentations are prepended to content.
 * @private
 * @param {string} content to prepend the indentation
 * @param {Number} size the number of indendations to use
 * @param {IndentationTypes} type the type of indendations to use 
 */
export function withIndendation(content = '', size, type) {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string');
  }
  if (size === 0) {
    return content;
  }
  //If the content includes new lines ensure that they have the added indentation as well.
  if (content.includes('\n')) {
    const newLineArray = content.split('\n');
    return newLineArray.reduce((accumulator, value) => {
      const newValue = value.trim() === '' ? value : `${getIndentation(size, type)}${value}`;
      return accumulator === null ? newValue : `${accumulator}\n${newValue}`;
    }, null);
  }
  return `${getIndentation(size, type)}${content}`;
}