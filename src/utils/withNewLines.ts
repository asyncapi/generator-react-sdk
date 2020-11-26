/**
 * 
 * @private
 * @param {string} content 
 * @param {number} number 
 */
export function withNewLines(content: string = '', number: number = 0) {
  const newLines = Array(number).fill('\n').join('');
  return content + newLines;
}
