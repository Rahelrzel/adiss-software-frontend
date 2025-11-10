import { all } from "redux-saga/effects";
import { watchLogin, watchSignup } from "../user/userSaga";
import {
  watchFetchPlaylists,
  watchCreatePlaylist,
  watchUpdatePlaylist,
  watchDeletePlaylist,
  watchFetchPlaylistById,
  watchRemoveSongFromPlaylist,
} from "../playlist/playlistSaga";
import { albumSaga } from "../album/albumSaga";
import { artistSaga } from "../artist/artistSaga";
import { genreSaga } from "../genre/genreSaga";
import {
  watchCreateSong,
  watchFetchSong,
  watchGetSongById,
  watchUpdateSong,
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
    watchRemoveSongFromPlaylist(),
    albumSaga(),
    artistSaga(),
    genreSaga(),
    watchFetchSong(),
    watchCreateSong(),
    watchGetSongById(),

    watchUpdateSong(),
    spotifySaga(),
    statSaga(),
    watchUpdateSong(),
  ]);
}
