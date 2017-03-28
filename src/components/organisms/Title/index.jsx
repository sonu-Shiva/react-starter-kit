import React, { PropTypes } from 'react';
import '../styles.scss';

const Title = (props) => {
  const { tag, children } = props;
  const Element = tag;
  return (
    <Element>{children}</Element>
  );
};

Title.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.node,
};

Title.defaultProps = {
  tag: 'h1',
};

export default Title;
