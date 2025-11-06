import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../app/pages/Auth/Login";
import Register from "../app/pages/Auth/Register";
import Landing from "../app/pages/Landing/Landing";
import Dashboard from "../app/pages/Dashboard/Dashboard";
import CreatePlaylist from "../app/pages/playlist/CreatePlaylist";
import PlaylistById from "../app/pages/playlist/playlistById/PlaylistById";
import CreateSong from "../app/pages/song/CreateSong";
import CreateArtistModal from "../app/pages/song/CreateArtistPage";
import CreateArtistPage from "../app/pages/song/CreateArtistPage";
import CreateGenrePage from "../app/pages/song/CreateGenrepage";
import CreateAlbumPage from "../app/pages/song/CreateAlbumPage";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/landing", element: <Landing /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/createPlaylist",
    element: <CreatePlaylist />,
  },
  {
    path: "/playlist/:id",
    element: <PlaylistById />,
  },
  {
    path: "/createSong/:playlistId?",
    element: <CreateSong />,
  },
  {
    path: "/artist/create",
    element: <CreateArtistPage />,
  },
  {
    path: "/genre/create",
    element: <CreateGenrePage />,
  },
  {
    path: "/album/create",
    element: <CreateAlbumPage />,
  },
]);
