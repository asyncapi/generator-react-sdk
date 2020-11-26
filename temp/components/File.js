import PropTypes from 'prop-types';
/**
 * Component is used to describe to the generator that you want a file to be created and rendered based on the defined children.
 * 
 * @component
 * @example
 * const name = "test.js"
 * const permissions = "777"
 * return (
 *   <File size={size} type={type}>Test</File>
 * )
 */
const File = ({ name = '', permissions = [], children }) => {
  return children;
};

File.propTypes = {
  /**
   * `name` prop describes the filename for which should be used when generating the file. If none is specified the filename for the template are used.
   */
  name: PropTypes.string,
  /**
   * `permissions` prop describes the permissions the file should be created with.
   */
  permissions: PropTypes.string,
};

export default File;