import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Musix } from 'components';

class SongsList extends Component {
  render() {
    return(
      <Musix {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songTitle: state.songTitle,
    songImage: state.songImage,
    songUrl: state.songUrl,
    currentSongNode: state.currentSongNode,
    songsList: state.songsList,
    songsCount: state.songsCount,
  }
};

export default connect(mapStateToProps)(SongsList);
