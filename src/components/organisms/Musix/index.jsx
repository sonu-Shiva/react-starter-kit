import React, { Component } from 'react';
import { Controls, Cover } from 'components';
import Dll from './dll';
import '../styles.scss';
import songsJson from '../songs.json';

const songs = songsJson;

export default class Musix extends Component {
  state = {
    songIndex: 0,
    playState: false,
    prevState: true,
    nextState: true,
    shuffleState: false,
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
    // changedValue.value = newVal;
    this.setState({ seekValue: newVal, });
  };

  getElapsedTime = () => () => {
    const currTime = document.getElementById('song');
    const elapsedTime = (currTime.currentTime / currTime.duration) * 100;
    // seeker.value = elapsedTime;
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
    return (
      <div className={'divStyle'}>
        <Cover songImage={this.state.songImage} songTitle={this.state.songTitle} />
        <Controls
          playState={this.state.playState}
          prevState={this.state.prevState}
          nextState={this.state.nextState}
          playPause={this.playPause}
          getValue={this.getValue}
          previous={this.previous}
          next={this.next}
          shuffle={this.shuffle}
          seekValue={this.state.seekValue}
          getElapsedTime={this.getElapsedTime}
          songUrl={this.state.songUrl}
        />
      </div>
    );
  }
}
