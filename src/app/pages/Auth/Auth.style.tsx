import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { colors } from "../../../config/theme/color";

// Generic text styles (no colors or font sizes hardcoded)
export const Header = styled.h1<{ size?: string; weight?: string }>(
  ({ size = "2em", weight = "700" }) => ({
    fontSize: size,
    fontWeight: weight,
    margin: "10px",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "2em",
  })
);

export const SubHeader = styled.h2<{ size?: string; weight?: string }>(
  ({ size = "1.5em", weight = "100" }) => ({
    fontSize: size,
    fontWeight: weight,
    margin: "0",
    marginBottom: "3rem",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  })
);

export const TextLink = styled(Link)<{ underline?: boolean }>(
  ({ underline = true }) => ({
    textDecoration: underline ? "underline" : "none",
    cursor: "pointer",
  })
);
export const InputGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px", // space between username & password
  marginBottom: "50px", // 👈 space before the button
});

export const FormRow = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
});

export const SecondaryText = styled.p({
  fontSize: "14px",
  color: colors.white,
  marginTop: "12px",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});

export const Linked = styled.a({
  color: colors.white, // blue tone, matches your theme
  fontWeight: "500",
  textDecoration: "none",
  marginLeft: "4px",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
});

export const Form = styled.form({
  display: "flex",
  flexDirection: "column",
});
