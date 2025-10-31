import React from "react";
import Background from "../../components/Background";

import {
  Header,
  Logo,
  Nav,
  MainContent,
  LeftSection,
  Headline,
  Subheading,
  Description,
  ButtonGroup,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  RightSection,
  StatCircle,
  StatPercentage,
  StatText,
  InnerRightSection,
  RectangleImage,
  RectangleWrapper,
  StrokeDiv,
} from "./Landing.style";
import { Linked } from "../Auth/Auth.style";

import GlassOverlay from "../../components/GlassOverLay";
import { Button } from "../../components/ui/Button";

const Landing = () => {
  return (
    <Background>
      <GlassOverlay>
        {" "}
        <Header>
          <Logo>Addis ሙዚቃ</Logo>
          <Nav>
            <Linked href="#home">Home</Linked>
            <Linked href="#about">About</Linked>
            <Linked href="#services">services</Linked>
            <Linked href="#register">Register</Linked>
            <Button variant="primary">Login</Button>
          </Nav>
        </Header>
        <MainContent>
          <LeftSection>
            <Headline>Feel the Beat, Your Way.</Headline>
            <Subheading>Stream. Discover. Play. Anytime, Anywhere.</Subheading>
            <Description>
              Experience music like never before. Discover new tracks, create
              playlists, and let the rhythm move you.
            </Description>

            <ButtonGroup>
              <Button width="250px" variant="primary">
                Login
              </Button>
              <Button width="250px" variant="secondary">
                Login
              </Button>
            </ButtonGroup>

            <StatsContainer>
              <StatCard>
                <StatNumber>345K</StatNumber>
                <StatLabel>Customers</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>345K</StatNumber>
                <StatLabel>Tracks</StatLabel>
              </StatCard>
            </StatsContainer>
          </LeftSection>

          <RightSection>
            <RectangleWrapper>
              <StrokeDiv>
                <img src="/src/assets/Rectangle 49.svg" />
              </StrokeDiv>
              <RectangleImage width="250px" height="530px" radius="200px">
                <img
                  src="/src/assets/theGirl.jpg"
                  alt="Woman with headphones"
                />
              </RectangleImage>{" "}
            </RectangleWrapper>

            <InnerRightSection>
              <StatCircle bgColor="rgba(100, 120, 140, 0.7)">
                <StatPercentage>90%</StatPercentage>
                <StatText>Peoples In The World Loves To Listen Music</StatText>
              </StatCircle>

              <RectangleImage width="200px" height="300px" radius="100px">
                <img src="/src/assets/theMic.jpg" alt="Microphone" />
              </RectangleImage>
            </InnerRightSection>
          </RightSection>
        </MainContent>{" "}
      </GlassOverlay>
    </Background>
  );
};

export default Landing;
