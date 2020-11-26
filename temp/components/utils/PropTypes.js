import PropTypes from 'prop-types';
import { IndentationTypes } from '../enums/IndentationTypes';
export const IndentationPropTypes = {
  /**
   * `size` prop expects a string which format should be a number which represent the number of `type`'s to indent each content. Default to no indentation.
   */
  size: PropTypes.string,
  /**
   * `type` prop expects a string, you can use the `IndentationTypes` enum, as either `TABS` or `SPACES`. The `type` defaults to `SPACES`. 
   */
  type: PropTypes.oneOf(Object.values(IndentationTypes)),
};