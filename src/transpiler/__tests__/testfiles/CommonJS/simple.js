/* eslint-disable no-undef */
const React = require('react');
const {File} = require('./../../../../../lib/components/index');
function greetings(name) {
  return `hello ${name}`;
}
// eslint-disable-next-line react/display-name
module.exports = function() {
  return (
    <File>
      {greetings('Test')}
    </File>
  );
};