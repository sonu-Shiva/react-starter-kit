import React, { PropTypes } from 'react';
import { Title } from 'components';
import '../styles.scss';

const Cover = (props) => {
  const { songImage, songTitle } = props;
  const divBG = {
    backgroundImage: `url(${songImage})`
  };
  return (
    <div style={divBG}>
      <Title>{songTitle}</Title>
    </div>
  );
};

Cover.propTypes = {
  songImage: PropTypes.string,
  songTitle: PropTypes.string,
};

export default Cover;
