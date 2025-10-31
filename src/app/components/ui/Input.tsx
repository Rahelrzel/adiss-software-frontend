import styled from "@emotion/styled";

interface InputProps {
  size?: "sm" | "md" | "lg";
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

const sizeStyles = {
  sm: { padding: "8px 10px", fontSize: "0.9rem" },
  md: { padding: "10px 12px", fontSize: "1rem" },
  lg: { padding: "12px 14px", fontSize: "1.1rem" },
};

const Input = styled.input((props: InputProps) => ({
  outline: "none",
  border: "none",
  width: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  borderRadius: "8px",
  transition: "all 0.3s ease-out",
  padding: sizeStyles[props.size || "md"].padding,
  fontSize: sizeStyles[props.size || "md"].fontSize,

  "::placeholder": {
    color: "rgba(255, 255, 255, 0.6)",
  },

  ":focus": {
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.6)",
    background: "rgba(255, 255, 255, 0.3)",
  },
}));

export default Input;
