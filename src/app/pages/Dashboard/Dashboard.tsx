import React, { useEffect } from "react";
import Background from "../../components/Background";
import PlaylistCard, {
  BottomSection,
  Container,
  Main,
  Menu,
  PlaylistGrid,
  Sidebar,
  VectorContainer,
} from "./dashboard.style";
import GlassCard from "../../components/GlassCard";
import { Logo } from "../Landing/Landing.style";

import { FaPlay } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdMic } from "react-icons/md";
import { BiPlus, BiPodcast } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { fetchPlaylistsRequest } from "../../stores/playlist/playlistSlice";

const Dashboard = () => {
  const route = useNavigate();

  const dispatch = useAppDispatch();
  const { playlist, loading } = useAppSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(fetchPlaylistsRequest());
  }, [dispatch]);

  const handleCreatePlaylist = () => {
    route("/createPlaylist");
  };

  return (
    <Background>
      <Main>
        <GlassCard width="300px" height="600px">
          <Sidebar>
            <Logo>Addis ሙዚቃ</Logo>
            <Menu>Menu</Menu>
            <Button leftIcon={<HiHome />}>Home</Button>
            <Button leftIcon={<BsSearch />}>Discover</Button>
            <Button leftIcon={<MdMic />}>Artists</Button>
            <Button leftIcon={<BiPodcast />}>Podcasts</Button>
          </Sidebar>
        </GlassCard>

        <Container>
          <Button leftIcon={<BiPlus />} onClick={handleCreatePlaylist}>
            Create Playlist
          </Button>
          <GlassCard width="1020px" height="auto">
            <div>welcome home</div>
            {loading ? (
              <div>Loading playlists...</div>
            ) : (
              <PlaylistGrid>
                {playlist.map((p) => {
                  const handleClick = () => {
                    route(`/playlist/${p._id}`);
                  };

                  return (
                    <div
                      key={p._id}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      <PlaylistCard
                        name={p.name}
                        songCount={p.songs.length}
                        coverImage="/src/assets/image.png"
                      />
                    </div>
                  );
                })}
              </PlaylistGrid>
            )}
          </GlassCard>
        </Container>
      </Main>
    </Background>
  );
};

export default Dashboard;
