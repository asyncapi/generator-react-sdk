import React from "react";
import PropTypes from 'prop-types';

import { FunctionComponent } from "../types";

export interface FileProps {
  fileName?: string;
  permissions?: number;
}

export const FilePropTypes = {
  /**
   * `fileName` prop describes the filename for which should be used when generating the file. If none is specified the filename for the template are used.
   */
  fileName: PropTypes.string,
  /**
   * `permissions` prop describes the permissions the file should be created with. This is interpreted as an octal number such as 
   */
  permissions: PropTypes.number,
};

/**
 * Component is used to describe to the generator that you want a file to be created and rendered based on the defined children.
 * 
 * @component
 * @example
 * const fileName = "test.js"
 * const permissions = 0o777
 * return (
 *   <File size={size} type={type}>Test</File>
 * )
 */
const File: FunctionComponent<FileProps> = ({ fileName, permissions, children }) => {
  return <>{children}</>;
};

File.propTypes = {
  ...FilePropTypes,
};
export default File;
