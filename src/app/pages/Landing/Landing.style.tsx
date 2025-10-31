import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  position: relative;
  z-index: 10;
`;

export const Logo = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export const Headline = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin: 0;
`;

export const Subheading = styled.h2`
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 500px;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: "200px";
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(200, 200, 200, 0.8) 100%
  );
  padding: 2rem;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a0033;
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

export const InnerRightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const RectangleImage = styled.div<{
  width?: string;
  height?: string;
  radius?: string;
}>`
  width: ${(props) => props.width || "150px"};
  height: ${(props) => props.height || "200px"};
  border-radius: ${(props) => props.radius || "20px"};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StatCircle = styled.div<{ bgColor: string }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 2rem;
`;

export const StatPercentage = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

export const StatText = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
`;

export const StrokeDiv = styled.div`
  position: absolute;
  inset: 0; /* make it fill the wrapper */
  z-index: 0; /* behind the image */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const RectangleWrapper = styled.div`
  position: relative;
  width: 300px; /* same as your RectangleImage width */
  height: 550px; /* same as your RectangleImage height */
  display: flex;
  align-items: center;
  justify-content: center;
`;
