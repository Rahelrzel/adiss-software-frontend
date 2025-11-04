import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { routerConfig } from "../../../config/router";
import userReducer from "../user/userSlice";
import playlistReducer from "../playlist/playlistSlice";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: routerConfig,
});

const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
