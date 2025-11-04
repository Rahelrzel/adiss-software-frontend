import styled from "@emotion/styled";

interface FlexProps {
  direction?: "row" | "column";
  justify?: string;
  align?: string;
  gap?: string;
  wrap?: string;
  width?: string;
  height?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.gap || "0"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
`;
