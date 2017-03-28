import songsJson from '../components/organisms/songs.json';
import Dll from '../components/organisms/Musix/dll';

const songsDll = new Dll();
songs.map((data) => {
  songsDll.add(data);
});

const currSongNode = songsDll.getNodeAt(0);
const initialState = {
  songTitle: currSongNode.data.title,
  songImage: currSongNode.data.img,
  songUrl: currSongNode.data.url,
  currentSongNode: currSongNode,
  songsList: songsDll,
  songsCount: songsDll.getLength()
};

const songsData = (state = initialState, action) => {
  switch (action.type) {
    case default: return state;
  }
}

export default function () {
  return songsJson;
}

