import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createGenreRequest } from "../../stores/genre/genreSlice";
import styled from "@emotion/styled";

const CreateGenreSchema = toFormikValidationSchema(
  z.object({
    name: z.string().min(1, "Genre name is required"),
  })
);

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 380px;
  padding: 24px;
  color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

interface CreateGenreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGenreModal: React.FC<CreateGenreModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const genreState = useAppSelector((state) => state.genre);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: CreateGenreSchema,
    onSubmit: (values) => {
      dispatch(createGenreRequest({ name: values.name }));
      hasSubmitted.current = true;
    },
  });

  useEffect(() => {
    if (hasSubmitted.current && !genreState.loading && !genreState.error) {
      onClose();
      hasSubmitted.current = false;
    }
  }, [genreState.loading, genreState.error, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Title>Create Genre</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" formik={formik} placeholder="Genre name" />

          <Button
            width="100%"
            type="submit"
            colorScheme="white"
            shape="round"
            glow
            isLoading={genreState.loading}
          >
            {genreState.loading ? "Creating..." : "Create Genre"}
          </Button>
        </Form>

        <Button
          width="100%"
          type="button"
          shape="round"
          style={{ marginTop: "10px" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalCard>
    </Overlay>,
    document.body
  );
};

export default CreateGenreModal;
