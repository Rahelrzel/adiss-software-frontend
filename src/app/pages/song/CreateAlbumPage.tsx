import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import styled from "@emotion/styled";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createAlbumRequest } from "../../stores/album/albumSlice";

const CreateAlbumSchema = toFormikValidationSchema(
  z.object({
    name: z.string().min(1, "Album name is required"),
    releaseYear: z.string().optional(),
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

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistId: string;
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({
  isOpen,
  onClose,
  artistId,
}) => {
  const dispatch = useAppDispatch();
  const albumState = useAppSelector((state) => state.album);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: { name: "", releaseYear: "" },
    validationSchema: CreateAlbumSchema,
    onSubmit: (values) => {
      if (!artistId) {
        alert("No artist selected!");
        return;
      }

      dispatch(
        createAlbumRequest({
          name: values.name,
          releaseYear: values.releaseYear,
          artistId,
        })
      );

      hasSubmitted.current = true;
    },
  });

  useEffect(() => {
    if (hasSubmitted.current && !albumState.loading && !albumState.error) {
      onClose();
      hasSubmitted.current = false;
    }
  }, [albumState.loading, albumState.error, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Title>Create Album</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" formik={formik} placeholder="Album name" />
          <FormikInput
            name="releaseYear"
            formik={formik}
            placeholder="Release year"
          />
          <Button
            type="submit"
            width="100%"
            colorScheme="white"
            shape="round"
            glow
            isLoading={albumState.loading}
          >
            {albumState.loading ? "Creating..." : "Create Album"}
          </Button>
        </Form>
        <Button
          type="button"
          width="100%"
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

export default CreateAlbumModal;
