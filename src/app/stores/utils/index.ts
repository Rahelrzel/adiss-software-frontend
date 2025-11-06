import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { routerConfig } from "../../../config/router";
import userReducer from "../user/userSlice";
import playlistReducer from "../playlist/playlistSlice";
import songReducer from "../song/songSlice";
import artistReducer from "../artist/artistSlice";
import genreReducer from "../genre/genreSlice";
import albumReducer from "../album/albumSlice";
import spotifyReducer from "../spotify/spotifySlice";

import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: routerConfig,
});

const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    song: songReducer,
    artist: artistReducer,
    genre: genreReducer,
    album: albumReducer,
    spotify: spotifyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
