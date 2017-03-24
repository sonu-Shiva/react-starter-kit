import React, { Component } from 'react';
import { Player } from 'components';
import Dll from './dll';
import '../module.scss';

const songs = [
  {
    title: '1. Stefano Gambarelli',
    img: 'http://wallup.net/wp-content/uploads/2016/01/227916-low_poly-abstract-blue-digital_art-artwork-geometry-748x499.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/PRX434B0myTYqNwCTjQl8A/1490335589/fa1b23bb5e35c8aed96b1a5aba43df3d/stefano_gambarelli_feat_pochill-land_on_mars_v2.mp3',
  },
  {
    title: '2. Accept-Seawinds',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220976-abstract-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/wUeTKjgjXee4h-PF0b5dSA/1490335589/a31a1abe019d922b7842fad752e8ab52/accept-seawinds_v2.mp3',
  },
  {
    title: '3. Accept - No time to lose',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220978-abstract-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/4Bsr-nrz9Fif3zTfO6h4Og/1490335589/7bf27920033b3e5e4d660e8ac34afb46/accept-no_time_to_lose.mp3',
  },
  {
    title: '4. Ultra Nate',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220979-fish-abstract-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/YLOMp3i35i9nUxRnfirUWg/1490335589/368fa38910ade35c0ccf5822a0004817/ultra_nate-free_javier_penna_remix.mp3',
  },
  {
    title: '5. Sons of Maria',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220980-abstract-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/leO0tPEgFfEQQWxLtQQL0A/1490335589/27c036d0b014d65690a6203400a351f3/sons_of_maria-with_you_me_my_toothbrush_remix.mp3',
  },
  {
    title: '6. Pete Logan',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220981-abstract-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/CosDu9frwGZEDX_TXaRvEg/1490335589/4ca4bf1421c302d5230869d438f3c8ba/pete_logan-wild_dreams_andrey_exx_feat_troitski_classic_rmx.mp3',
  },
  {
    title: '7. Hardwell - Follow me',
    img: 'http://wallup.net/wp-content/uploads/2016/01/220982-abstract-snow-snowflakes-748x468.jpg',
    url: 'http://ring.get4mobile.net/ringtone/ringtone/iQgpbpkVq12pwHxIxibEKQ/1490335589/c758ecf8df6149c85462b6c88b1dfc17/hardwell_feat_jason_derulo-follow_me.mp3',
  },
];

export default class Musix extends Component {

  state = {
    songTitle: '',
    songImage: '',
    songUrl: '',
    songIndex: 0,
    playState: false,
    prevState: true,
    nextState: true,
    shuffleState: false,
    currentSongNode: null,
    songsList: {},
    songsCount: 0,
    prevIndex: 0,
    seekValue: 0,
  }

  componentWillMount() {
    const songsDll = new Dll();
    songs.map((data) => {
      songsDll.add(data);
    });

    const songsDllHead = songsDll.getNodeAt(0);
    const songsCount = songsDll.getLength();
    this.setState({
      songTitle: songsDllHead.data.title,
      songImage: songsDllHead.data.img,
      songUrl: songsDllHead.data.url,
      currentSongNode: songsDllHead,
      songsList: songsDll,
      songsCount,
      nextState: !songsCount,
    });
  }

  getValue = () => () => {
    const currValue = document.getElementById('song');
    const changedValue = document.getElementById('seek');
    const newVal = (currValue.duration * parseFloat(changedValue.value)) / 100;
    currValue.currentTime = newVal;
    changedValue.value = newVal;
    this.setState({ seekValue: newVal, });
  };

  getElapsedTime = () => () => {
    const currTime = document.getElementById('song');
    const seeker = document.getElementById('seek');
    const elapsedTime = (currTime.currentTime / currTime.duration) * 100;
    seeker.value = elapsedTime;
    this.setState({ seekValue: elapsedTime, });
  };

  getRandomIndex = (ignoreIndex) => {
    let randomIndex = -1;
    do {
      randomIndex = Math.floor(Math.random() * this.state.songsCount);
    } while (randomIndex === ignoreIndex);
    return randomIndex;
  };

  playPause = () => () => {
    const songElement = document.getElementById('song');
    if (songElement.paused) {
      songElement.play();
      this.setState({ playState: true });
    } else {
      songElement.pause();
      this.setState({ playState: false });
    }
  };

  previous = () => () => {
    let prevSongNode;
    let songIndex;
    let prevState;
    let nextState;
    if (this.state.shuffleState) {
      songIndex = this.getRandomIndex(this.state.prevIndex);
      prevSongNode = this.state.songsList.getNodeAt(songIndex);
      prevState = false;
      nextState = false;
    } else {
      prevSongNode = this.state.currentSongNode.previous;
      songIndex = this.state.songIndex - 1;
      prevState = !prevSongNode.previous;
      nextState = !prevSongNode.next;
    }
    this.setState({
      songTitle: prevSongNode.data.title,
      songImage: prevSongNode.data.img,
      songUrl: prevSongNode.data.url,
      currentSongNode: prevSongNode,
      prevIndex: songIndex,
      playState: true,
      prevState,
      nextState,
      songIndex,
    });

    this.lockAndLoad();
  };

  next = () => () => {
    if (!this.state.shuffleState && this.state.currentSongNode.next === null) {
      this.setState({
        nextState: true,
        playState: false,
      });
      return;
    }
    let nextSongNode;
    let songIndex;
    let prevState;
    let nextState;
    let playState;
    if (this.state.shuffleState) {
      songIndex = this.getRandomIndex(this.state.prevIndex);
      nextSongNode = this.state.songsList.getNodeAt(songIndex);
      prevState = false;
      nextState = false;
      playState = true;
    } else {
      nextSongNode = this.state.currentSongNode.next;
      songIndex = this.state.songIndex + 1;
      prevState = !nextSongNode.previous;
      nextState = !nextSongNode.next;
      playState = !nextState;
    }
    this.setState({
      songTitle: nextSongNode.data.title,
      songImage: nextSongNode.data.img,
      songUrl: nextSongNode.data.url,
      currentSongNode: nextSongNode,
      prevIndex: songIndex,
      playState,
      prevState,
      nextState,
      songIndex,
      seekValue: 0,
    });

    this.lockAndLoad();
  };

  shuffle = () => () => {
    let prevState = false;
    let nextState = false;
    if (this.state.shuffleState) {
      prevState = !this.state.songIndex;
      nextState = (this.state.songIndex + 1 >= this.state.songsCount);
    }
    this.setState({
      shuffleState: !this.state.shuffleState,
      prevState,
      nextState,
    });
  };

  lockAndLoad = () => {
    const songElement = document.getElementById('song');
    songElement.load();
    songElement.play();
  };

  render() {
    const divStyle = {
      backgroundImage: `url(${this.state.songImage})`,
    };
    return (
      <div className={'divStyle'} style={divStyle}>
        <div>
          <h1>{this.state.songTitle}</h1>
        </div>
        <Player
          playState={this.state.playState}
          prevState={this.state.prevState}
          nextState={this.state.nextState}
          playPause={this.playPause}
          getValue={this.getValue}
          previous={this.previous}
          next={this.next}
          shuffle={this.shuffle}
          seekValue={this.state.seekValue}
        />
        <audio id={'song'} onTimeUpdate={this.getElapsedTime()} onEnded={this.next()}>
          <source src={this.state.songUrl} type={'audio/mpeg'} />
        </audio>
      </div>
    );
  }
}
