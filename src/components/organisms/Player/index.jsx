import React, { PropTypes } from 'react';
import '../module.scss';

const icons = {
  next: 'http://www.pngmart.com/files/3/Next-Button-Transparent-Background.png',
  previous: 'http://www.pngmart.com/files/3/Previous-Button-PNG-HD.png',
  play: 'http://pngimages.net/sites/default/files/play-png-image-54101.png',
  pause: 'http://icon-icons.com/icons2/495/PNG/512/video-control-pause_icon-icons.com_48386.png',
  shuffle: 'https://openclipart.org/image/2400px/svg_to_png/211789/matt-icons_media-shuffle.png',
};

const Player = (props) => {
  const { playPause, previous, next, shuffle, playState, prevState, nextState, seekValue, getValue } = props;
  let image;
  if (playState) {
    image = icons.pause;
  } else {
    image = icons.play;
  }
  return (
    <div>
      <input type={'range'} className={'seekStyle'} value={seekValue} onChange={getValue()} id={'seek'} />
      <div className={'align'}>
        <br />
        <span className={'centered'}>
          <button type={'button'} className={'button'} disabled={prevState} onClick={previous()}><img className={'buttonImg'} src={icons.previous} alt={'Previous Button'} /></button>
          <button type={'button'} className={'button'} onClick={playPause()}><img className={'buttonImg'} src={image} alt={'Play/Pause Button'} /></button>
          <button type={'button'} className={'button'} disabled={nextState} onClick={next()}><img className={'buttonImg'} src={icons.next} alt={'Next Button'} /></button>
        </span>
        <button type={'button'} className={'shuffle'} onClick={shuffle()}><img className={'buttonImg'} src={icons.shuffle} alt={'Shuffle Button'} /></button>
      </div>
    </div>
  );
};

Player.propTypes = {
  playState: PropTypes.bool,
  prevState: PropTypes.bool,
  nextState: PropTypes.bool,
  playPause: PropTypes.func,
  previous: PropTypes.func,
  shuffle: PropTypes.func,
  getValue: PropTypes.func,
  next: PropTypes.func,
  seekValue: PropTypes.number,
};

export default Player;
