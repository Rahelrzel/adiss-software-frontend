import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../app/pages/Auth/Login";
import Register from "../app/pages/Auth/Register";
import Landing from "../app/pages/Landing/Landing";
import Dashboard from "../app/pages/Dashboard/Dashboard";
import CreatePlaylist from "../app/pages/playlist/CreatePlaylist";
import PlaylistById from "../app/pages/playlist/playlistById/PlaylistById";
import CreateSong from "../app/pages/song/CreateSong";
import DashboardLayout from "../app/pages/DashboardLayout";
import UpdateSong from "../app/pages/song/UpdateSong";
import DiscoverPage from "../app/components/Discover";

export const routerConfig = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Landing /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "playlist/:id", element: <PlaylistById /> },
      { path: "createPlaylist", element: <CreatePlaylist /> },
      { path: "createSong/:playlistId?", element: <CreateSong /> },
      { path: "updateSong/:id/:playlistId?", element: <UpdateSong /> },
      { path: "discover", element: <DiscoverPage /> }, // ✅ new route
    ],
  },
]);
