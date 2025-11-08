import styled from "@emotion/styled";
import React from "react";

interface GlassOverlayProps {
  children: React.ReactNode;
}

function GlassOverlay({ children }: GlassOverlayProps) {
  return <OverlayContainer>{children}</OverlayContainer>;
}

export default GlassOverlay;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.16);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  display: flex;
  flex-direction: column;

  color: #fff;
  z-index: 10;

  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.05);
`;
