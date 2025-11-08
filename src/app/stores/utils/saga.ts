import { all } from "redux-saga/effects";
import { watchLogin, watchSignup } from "../user/userSaga";
import {
  watchFetchPlaylists,
  watchCreatePlaylist,
  watchUpdatePlaylist,
  watchDeletePlaylist,
  watchFetchPlaylistById,
} from "../playlist/playlistSaga";
import { albumSaga } from "../album/albumSaga";
import { artistSaga } from "../artist/artistSaga";
import { genreSaga } from "../genre/generSaga";
import {
  watchCreateSong,
  watchFetchSong,
  watchGetSongById,
} from "../song/songSaga";
import { spotifySaga } from "../spotify/spotifySaga";
import { statSaga } from "../stat/stat.saga";

export function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchFetchPlaylists(),
    watchCreatePlaylist(),
    watchUpdatePlaylist(),
    watchDeletePlaylist(),
    watchFetchPlaylistById(),
    albumSaga(),
    artistSaga(),
    genreSaga(),
    watchFetchSong(),
    watchCreateSong(),
    watchGetSongById(),
    spotifySaga(),
    statSaga(),
  ]);
}
