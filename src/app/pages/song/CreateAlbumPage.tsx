// src/features/artist/CreateArtistPage.tsx
import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";

import styled from "@emotion/styled";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { BiUserPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { createAlbumRequest } from "../../stores/album/albumSlice";

const CreateAlbumSchema = toFormikValidationSchema(
  z.object({
    // Only require the artist name in the form. We set userId from the
    // logged-in user when submitting so the user doesn't need to fill it.
    name: z.string().min(1, "Artist name is required"),
    releaseYear: z.string(),
  })
);

export type CreateAlbumValues = z.infer<typeof CreateAlbumSchema>;

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

const CreateAlbumPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const albumState = useAppSelector((state) => state.album);

  const artist = useAppSelector((state) => state.artist);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      releaseYear: "",
    },
    validationSchema: CreateAlbumSchema,
    onSubmit: (values) => {
      // include the current user's id when dispatching the request
      dispatch(
        createAlbumRequest({
          releaseYear: values.releaseYear,
          name: values.name,
          artistId: artist.artist?._id || "",
        })
      );
      hasSubmitted.current = true;
    },
  });

  // ✅ Redirect after successful creation
  useEffect(() => {
    if (hasSubmitted.current && !albumState.loading && !albumState.error) {
      navigate("/createSong"); // go back to dashboard or song page
      hasSubmitted.current = false;
    }
  }, [albumState.loading, albumState.error, navigate]);

  return (
    <Background>
      <GlassCard width="400px" height="400px">
        <Title>Create Album</Title>
        <Form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" formik={formik} placeholder="Album name" />
          <FormikInput
            name="releaseYear"
            formik={formik}
            placeholder="Album name"
          />
          <Button
            width="100"
            type="submit"
            colorScheme="white"
            shape="round"
            glow
            isLoading={albumState.loading}
          >
            {albumState.loading ? "Creating..." : "Create Artist"}
          </Button>
        </Form>
      </GlassCard>
    </Background>
  );
};

export default CreateAlbumPage;
