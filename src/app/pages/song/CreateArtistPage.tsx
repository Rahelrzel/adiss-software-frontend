// src/features/artist/CreateArtistPage.tsx
import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createArtistRequest } from "../../stores/artist/artistSlice";
import styled from "@emotion/styled";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { BiUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CreateArtistSchema = toFormikValidationSchema(
  z.object({
    // Only require the artist name in the form. We set userId from the
    // logged-in user when submitting so the user doesn't need to fill it.
    name: z.string().min(1, "Artist name is required"),
  })
);

export type CreateArtistValues = z.infer<typeof CreateArtistSchema>;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: white;
`;

const CreateArtistPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artistState = useAppSelector((state) => state.artist);
  const user = useAppSelector((state) => state.user);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CreateArtistSchema,
    onSubmit: (values) => {
      // include the current user's id when dispatching the request
      dispatch(
        createArtistRequest({ name: values.name, userId: user.user?.id || "" })
      );
      hasSubmitted.current = true;
    },
  });

  // ✅ Redirect after successful creation
  useEffect(() => {
    if (hasSubmitted.current && !artistState.loading && !artistState.error) {
      navigate("/createSong"); // go back to dashboard or song page
      hasSubmitted.current = false;
    }
  }, [artistState.loading, artistState.error, navigate]);

  return (
    <Background>
      <GlassCard width="400px" height="400px">
        <Title>Create Artist</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" formik={formik} placeholder="Artist name" />

          <Button
            width="100"
            type="submit"
            colorScheme="white"
            shape="round"
            glow
            isLoading={artistState.loading}
          >
            {artistState.loading ? "Creating..." : "Create Artist"}
          </Button>
        </Form>
      </GlassCard>
    </Background>
  );
};

export default CreateArtistPage;
