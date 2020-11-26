import React from "react";
import PropTypes from 'prop-types';

import { FunctionComponent } from "../types";

export interface FileProps {
  name?: string;
  permissions?: Array<string>;
}

export const FilePropTypes = {
  /**
   * `name` prop describes the filename for which should be used when generating the file. If none is specified the filename for the template are used.
   */
  name: PropTypes.string,
  /**
   * `permissions` prop describes the permissions the file should be created with.
   */
  permissions: PropTypes.arrayOf(PropTypes.string.isRequired),
};

/**
 * Component is used to describe to the generator that you want a file to be created and rendered based on the defined children.
 * 
 * @component
 * @example
 * const name = 4
 * const type = IndentationTypes.SPACES
 * const newLines = 2
 * return (
 *   <File indent={size} type={type} newLines={newLines}>Test</Text>
 * )
 */
const File: FunctionComponent<FileProps> = ({ name = '', permissions = [], children }) => {
  return <>{children}</>;
};

File.propTypes = {
  ...FilePropTypes,
};
export default File;
