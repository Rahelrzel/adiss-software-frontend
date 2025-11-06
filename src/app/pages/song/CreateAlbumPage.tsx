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
import { useNavigate, useLocation } from "react-router-dom";
import { createAlbumRequest } from "../../stores/album/albumSlice";

const CreateAlbumSchema = toFormikValidationSchema(
  z.object({
    name: z.string().min(1, "Album name is required"),
    releaseYear: z.string(),
  })
);

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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const albumState = useAppSelector((state) => state.album);

  const hasSubmitted = useRef(false);

  // ✅ Get artistId from router state (passed from CreateSong page)
  const selectedArtistId = location.state?.artistId || "";

  const formik = useFormik({
    initialValues: {
      name: "",
      releaseYear: "",
    },
    validationSchema: CreateAlbumSchema,
    onSubmit: (values) => {
      if (!selectedArtistId) {
        alert("No artist selected for this album!");
        return;
      }

      dispatch(
        createAlbumRequest({
          name: values.name,
          releaseYear: values.releaseYear,
          artistId: selectedArtistId, // ✅ use the selected artist
        })
      );

      hasSubmitted.current = true;
    },
  });

  // Redirect after album creation
  useEffect(() => {
    if (hasSubmitted.current && !albumState.loading && !albumState.error) {
      navigate("/createSong"); // go back to CreateSong page
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
            placeholder="Release year"
          />
          <Button
            width="100"
            type="submit"
            colorScheme="white"
            shape="round"
            glow
            isLoading={albumState.loading}
          >
            {albumState.loading ? "Creating..." : "Create Album"}
          </Button>
        </Form>
      </GlassCard>
    </Background>
  );
};

export default CreateAlbumPage;
