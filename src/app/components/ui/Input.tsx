import styled from "@emotion/styled";
import type { FC } from "react";

interface InputProps {
  inputSize?: "sm" | "md" | "lg"; // renamed from 'size'
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  name?: string;
  disabled?: boolean;
  error?: string | undefined;
  touched?: boolean | undefined;
  readOnly?: boolean;
}

const sizeStyles = {
  sm: { padding: "8px 10px", fontSize: "0.9rem" },
  md: { padding: "10px 12px", fontSize: "1rem" },
  lg: { padding: "12px 14px", fontSize: "1.1rem" },
};

const Input = styled.input<InputProps>((props) => ({
  outline: "none",
  border: props.error && props.touched ? "1px solid #ff4d4f" : "none",
  width: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  borderRadius: "8px",
  transition: "all 0.3s ease-out",
  padding: sizeStyles[props.inputSize || "md"].padding,
  fontSize: sizeStyles[props.inputSize || "md"].fontSize,

  "::placeholder": {
    color: "rgba(255, 255, 255, 0.6)",
  },

  ":focus": {
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.6)",
    background: "rgba(255, 255, 255, 0.3)",
  },
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

const ErrorText = styled.span({
  display: "block",
  color: "#ff4d4f",
  fontSize: "0.8rem",
  marginTop: "5px",
});

interface FormikInputProps {
  name: string;
  formik: any;
  placeholder?: string;
  type?: string;
  inputSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
}

export const FormikInput: FC<FormikInputProps> = ({
  name,
  formik,
  placeholder,
  type = "text",
  inputSize = "md",
  disabled,
  readOnly,
  value,
}) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];
  const displayValue = value !== undefined ? value : formik.values[name];

  return (
    <div style={{ width: "100%" }}>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={displayValue}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        inputSize={inputSize}
        disabled={disabled}
        error={error}
        touched={touched}
        readOnly={readOnly}
      />
      {touched && error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

const TextArea = styled.textarea<InputProps>((props) => ({
  outline: "none",
  border: props.error && props.touched ? "1px solid #ff4d4f" : "none",
  width: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  color: "#fff",
  borderRadius: "8px",
  transition: "all 0.3s ease-out",
  padding: sizeStyles[props.inputSize || "md"].padding,
  fontSize: sizeStyles[props.inputSize || "md"].fontSize,
  resize: "vertical", // allows vertical resizing, optional
  minHeight: "80px", // default height
  "::placeholder": {
    color: "rgba(255, 255, 255, 0.6)",
  },
  ":focus": {
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.6)",
    background: "rgba(255, 255, 255, 0.3)",
  },
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

interface FormikTextAreaProps {
  name: string;
  formik: any;
  placeholder?: string;
  inputSize?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const FormikTextArea: FC<FormikTextAreaProps> = ({
  name,
  formik,
  placeholder,
  inputSize = "md",
  disabled,
}) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];

  return (
    <div style={{ width: "100%" }}>
      <TextArea
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        inputSize={inputSize}
        disabled={disabled}
        error={error}
        touched={touched}
      />
      {touched && error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
