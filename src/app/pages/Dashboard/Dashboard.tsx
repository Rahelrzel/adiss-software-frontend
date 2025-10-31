import React from "react";
import Background from "../../components/Background";
import {
  BottomSection,
  Container,
  Main,
  Menu,
  Sidebar,
  VectorContainer,
} from "./dashboard.style";
import GlassCard from "../../components/GlassCard";
import { Logo } from "../Landing/Landing.style";
import Button from "../../components/ui/Button.style";
import { FaPlay } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { MdMic } from "react-icons/md";
import { BiPodcast } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";

const Dashboard = () => {
  return (
    <Background>
      <Container>
        <Main>
          <GlassCard width="300px" height="600px">
            <Sidebar>
              <Logo>Addis ሙዚቃ</Logo> <Menu>Menu</Menu>
              <Button leftIcon={<HiHome />}>Home</Button>
              <Button leftIcon={<BsSearch />}>Discover</Button>
              <Button leftIcon={<MdMic />}>Artists</Button>
              <Button leftIcon={<BiPodcast />}>Podcasts</Button>
            </Sidebar>
          </GlassCard>
          <Container>
            <GlassCard width="1020px" height="250px">
              <VectorContainer>
                <img
                  src="/src/assets/Clip path group.svg"
                  alt="Decorative vector"
                />
              </VectorContainer>
            </GlassCard>
            <GlassCard width="1020px" height="350px">
              {" "}
              <Button leftIcon={<FaPlay />}>Play Music</Button>
            </GlassCard>
          </Container>
        </Main>
        <BottomSection>
          <GlassCard width="1350px" height="50px">
            <h1>Dashboard Page</h1>
          </GlassCard>
        </BottomSection>
      </Container>
    </Background>
  );
};

export default Dashboard;
