import React from "react";
import Background from "../../components/Background";
import PlaylistCard, {
  BottomSection,
  Container,
  Main,
  Menu,
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

const Dashboard = () => {
  const route = useNavigate(); // ✅ Hook for navigation

  const handleCreatePlaylist = () => {
    route("/createPlaylist");
  };

  return (
    <Background>
      <Container>
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

            <GlassCard width="1020px" height="350px">
              <div>welcome home </div>
              <PlaylistCard
                name="Chill Vibes"
                songCount={15}
                coverImage="/src/assets/image.png"
              />
            </GlassCard>
          </Container>
        </Main>
      </Container>
    </Background>
  );
};

export default Dashboard;
