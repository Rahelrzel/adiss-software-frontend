import { Outlet, useNavigate } from "react-router-dom";

import { Logo } from "../Landing/Landing.style";
import { HiHome } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";

import { BiPlus } from "react-icons/bi";

import Background from "../../components/Background";

import Button from "../../components/ui/Button";
import { Container, Main, Menu, Sidebar } from "./dashboard.style";
import { Flex } from "../../components/ui/Flex.style";

const DashboardLayout = () => {
  const route = useNavigate();

  const handleCreatePlaylist = () => {
    route("/dashboard/createPlaylist");
  };

  return (
    <Background>
      <Main>
        <Sidebar>
          <Logo>Addis ሙዚቃ</Logo>
          <Menu>
            <Flex direction="column" gap="30px">
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
            </Flex>
          </Menu>
        </Sidebar>

        <Container>
          <Outlet />
        </Container>
      </Main>
    </Background>
  );
};

export default DashboardLayout;
