import { Outlet, useNavigate } from "react-router-dom";

import { Logo } from "../pages/Landing/Landing.style";
import { HiHome } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";

import { BiPlus } from "react-icons/bi";

import {
  Sidebar,
  Main,
  Container,
  Menu,
} from "../pages/Dashboard/dashboard.style";
import Background from "../components/Background";
import GlassCard from "../components/GlassCard";
import Button from "../components/ui/Button";

const DashboardLayout = () => {
  const route = useNavigate();

  const handleCreatePlaylist = () => {
    route("/dashboard/createPlaylist");
  };

  return (
    <Background>
      <Main>
        <GlassCard width="300px" height="600px">
          <Sidebar>
            <Logo>Addis ሙዚቃ</Logo>
            <Menu>Menu</Menu>
            <Button leftIcon={<HiHome />} onClick={() => route("/dashboard")}>
              Home
            </Button>
            <Button
              leftIcon={<BsSearch />}
              onClick={() => route("/dashboard/discover")}
            >
              Discover
            </Button>

            <Button leftIcon={<BiPlus />} onClick={handleCreatePlaylist}>
              Create Playlist
            </Button>
          </Sidebar>
        </GlassCard>

        <Container>
          <Outlet />
        </Container>
      </Main>
    </Background>
  );
};

export default DashboardLayout;
