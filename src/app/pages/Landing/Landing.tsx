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
import GlassOverlay from "../../components/GlassOverLay";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import theGirl from "../../../assets/theGirl.jpg";
import theBorder from "../../../assets/Rectangle 49.svg";
import theMic from "../../../assets/theMic.jpg";

const Landing = () => {
  const route = useNavigate();

  const handleClickRegister = () => {
    route("/register");
  };
  const handleClickLogin = () => {
    route("/login");
  };
  return (
    <Background>
      <GlassOverlay>
        {" "}
        <Header>
          <Logo>Addis ሙዚቃ</Logo>
          <Nav>
            <Button shape="round" onClick={() => handleClickRegister()}>
              register
            </Button>
            <Button
              shape="round"
              onClick={() => handleClickLogin()}
              colorScheme="white"
            >
              Login
            </Button>
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
              <Button
                shape="round"
                onClick={() => handleClickLogin()}
                colorScheme="white"
                width="250px"
              >
                Play The Music
              </Button>
              <Button
                shape="round"
                onClick={() => handleClickRegister()}
                width="250px"
              >
                Discover
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
                <img src={theBorder} />
              </StrokeDiv>
              <RectangleImage width="250px" height="530px" radius="200px">
                <img src={theGirl} alt="Woman with headphones" />
              </RectangleImage>{" "}
            </RectangleWrapper>

            <InnerRightSection>
              <StatCircle bgColor="rgba(100, 120, 140, 0.7)">
                <StatPercentage>90%</StatPercentage>
                <StatText>Peoples In The World Loves To Listen Music</StatText>
              </StatCircle>

              <RectangleImage width="200px" height="300px" radius="100px">
                <img src={theMic} alt="Microphone" />
              </RectangleImage>
            </InnerRightSection>
          </RightSection>
        </MainContent>{" "}
      </GlassOverlay>
    </Background>
  );
};

export default Landing;
