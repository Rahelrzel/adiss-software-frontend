import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../app/pages/Auth/Login";
import Register from "../app/pages/Auth/Register";
import Landing from "../app/pages/Landing/Landing";
import Dashboard from "../app/pages/Dashboard/Dashboard";
import CreatePlaylist from "../app/pages/playlist/CreatePlaylist";
import PlaylistById from "../app/pages/playlist/playlistById/PlaylistById";
import CreateSong from "../app/pages/song/CreateSong";
import DashboardLayout from "../app/pages/DashboardLayout";
// ✅ use this layout

export const routerConfig = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Landing /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // ✅ layout with sidebar + outlet
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      { path: "playlist/:id", element: <PlaylistById /> }, // /dashboard/playlist/:id
      { path: "createPlaylist", element: <CreatePlaylist /> },
      { path: "createSong/:playlistId?", element: <CreateSong /> },
    ],
  },
]);
