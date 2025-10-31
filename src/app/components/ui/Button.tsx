import styled from "@emotion/styled";

export const Button = styled.button<{
  variant?: "primary" | "secondary";
  width?: string;
  height?: string;
  radius?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "40px"};
  padding: 1rem 2.5rem;
  border-radius: ${(props) => props.radius || "50px"};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  background: ${(props) =>
    props.variant === "secondary" ? "transparent" : props.bgColor || "white"};
  color: ${(props) =>
    props.textColor || (props.variant === "secondary" ? "white" : "#1a0033")};
  border: ${(props) =>
    props.variant === "secondary"
      ? `2px solid ${props.borderColor || "rgba(255, 255, 255, 0.3)"}`
      : "none"};
`;
