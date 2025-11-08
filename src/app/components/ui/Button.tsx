import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";
import { BiLoaderAlt } from "react-icons/bi";

const colorSchemes = {
  white: {
    background: "#ffffffff",
    hover: "#d6d6d6ff",
    color: "#1a0033",
  },
  blue: {
    background: "#007BFF",
    hover: "#339CFF",
    color: "#fff",
  },
  red: {
    background: "#FF4C4C",
    hover: "#FF6B6B",
    color: "#fff",
  },
  default: {
    background: "transparent",
    hover: "rgba(255,255,255,0.1)",
    color: "#ffffff",
  },
};

const shapeToBorderRadius = {
  round: "50px",
  circle: "100%",
  rectangle: "6px",
};

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  leftIcon?: ReactNode;
  colorScheme?: keyof typeof colorSchemes;
  shape?: keyof typeof shapeToBorderRadius;
  glow?: boolean;
  isLoading?: boolean;
  width?: string;
  height?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  leftIcon,
  colorScheme = "default",
  shape = "rectangle",
  glow = false,
  isLoading = false,
  width = "200px",
  height = "40px",
  ...props
}) => {
  return (
    <ButtonContainer
      {...props}
      colorScheme={colorScheme}
      shape={shape}
      glow={glow}
      width={width}
      height={height}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner>
          <BiLoaderAlt />
        </Spinner>
      ) : (
        <>
          {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
          {children}
        </>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => shapeToBorderRadius[props.shape || "rectangle"]};
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease;
  background: ${(props) =>
    colorSchemes[props.colorScheme || "default"].background};
  color: ${(props) => colorSchemes[props.colorScheme || "default"].color};
  box-shadow: ${(props) =>
    props.glow
      ? `0 0 15px ${colorSchemes[props.colorScheme || "default"].background}80`
      : "none"};

  &:hover {
    background: ${(props) =>
      colorSchemes[props.colorScheme || "default"].hover};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  animation: ${spin} 0.6s linear infinite;
`;

export default Button;
