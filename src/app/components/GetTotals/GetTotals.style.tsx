import styled from "@emotion/styled";

export const TotalsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding: 10px 0;
  justify-content: center;
`;

export const TotalCard = styled.div<{ background: string }>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const CardNumber = styled.h2`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  z-index: 2;
`;

export const CardLabel = styled.p`
  position: absolute;

  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  z-index: 2;
`;
