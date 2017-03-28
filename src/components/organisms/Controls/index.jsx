import React, { PropTypes } from 'react';
import classnames from 'classnames';
import '../styles.scss';

const Controls = (props) => {
  const {
    playPause,
    previous,
    next,
    shuffle,
    playState,
    prevState,
    nextState,
    seekValue,
    getValue,
    getElapsedTime,
    songUrl
  } = props;

  const togglePlayPause = classnames({
    'fa-play': !playState,
    'fa-pause': playState,
    fa: true,
    button: true,
    playpause: true,
  });
  return (
    <div>
      <input type={'range'} className={'seekStyle'} value={seekValue ? seekValue : 0} onChange={getValue()} id={'seek'} />
      <div className={'align'}>
        <br />
        <span className={'centered'}>
          <button type={'button'} className={'button fa fa-step-backward previous'} disabled={prevState} onClick={previous()} />
          <button type={'button'} className={togglePlayPause} onClick={playPause()} />
          <button type={'button'} className={'button fa fa-step-forward next'} disabled={nextState} onClick={next()} />
        </span>
        <button type={'button'} className={'fa fa-random shuffle'} onClick={shuffle()} />
      </div>
      <audio id={'song'} onTimeUpdate={getElapsedTime()} onEnded={next()}>
        <source src={songUrl} type={'audio/mpeg'} />
      </audio>
    </div>
  );
};

Controls.propTypes = {
  playState: PropTypes.bool,
  prevState: PropTypes.bool,
  nextState: PropTypes.bool,
  playPause: PropTypes.func,
  previous: PropTypes.func,
  shuffle: PropTypes.func,
  getValue: PropTypes.func,
  next: PropTypes.func,
  seekValue: PropTypes.number,
  getElapsedTime: PropTypes.func,
  songUrl: PropTypes.string
};

export default Controls;
