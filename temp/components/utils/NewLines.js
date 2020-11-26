/**
 * 
 * @private
 * @param {*} content 
 * @param {*} number 
 */
export function withNewLines(content = '', number = 0) {
  const newLines = Array(number).fill('\n').join('');
  return content + newLines;
}