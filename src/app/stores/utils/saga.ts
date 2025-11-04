import { all } from "redux-saga/effects";
import { watchLogin, watchSignup } from "../user/userSaga";
import {
  watchFetchPlaylists,
  watchCreatePlaylist,
  watchUpdatePlaylist,
  watchDeletePlaylist,
  watchFetchPlaylistById,
} from "../playlist/playlistSaga";

export function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchFetchPlaylists(),
    watchCreatePlaylist(),
    watchUpdatePlaylist(),
    watchDeletePlaylist(),
    watchFetchPlaylistById(),
  ]);
}
