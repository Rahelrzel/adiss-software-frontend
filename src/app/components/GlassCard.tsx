import styled from "@emotion/styled";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
}

function GlassCard({
  children,
  width = "400px",
  height = "auto",
}: GlassCardProps) {
  return <CardContainer style={{ width, height }}>{children}</CardContainer>;
}

export default GlassCard;

// Styled Component
const CardContainer = styled.div`
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);

  display: flex;
  flex-direction: column;

  padding: 2rem;
  color: #fff;
  z-index: 2;

  transition: all 0.3s ease;
`;
