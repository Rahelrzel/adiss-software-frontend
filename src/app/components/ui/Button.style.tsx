import styled from "@emotion/styled";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  leftIcon?: ReactNode;
  width?: string;
  height?: string;
  radius?: string;
  textColor?: string;
}

export const Button: FC<IButton> = ({
  children,
  leftIcon,
  width = "200px",
  height = "40px",
  radius = "8px",
  textColor = "#ffffff",
  ...props
}) => {
  return (
    <ButtonContainer
      width={width}
      height={height}
      radius={radius}
      textColor={textColor}
      {...props}
    >
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  width: string;
  height: string;
  radius: string;
  textColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: transparent;
  color: ${(props) => props.textColor};
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: ${(props) => props.radius};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
`;

export default Button;
