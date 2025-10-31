import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Menu = styled.p`
  font-size: 1;
  color: #ffffffff;
  margin: 0;
`;

export const VectorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1; /* keeps it above background but below main content */

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  img,
  svg {
    width: 450px; /* adjust as needed */
    height: 550px; /* adjust as needed */
  }
`;
