import { useFormik } from "formik";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { FormikInput, FormikTextArea } from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  StyledForm,
  Text,
  Toggle,
  ToggleCircle,
  ToggleWrapper,
} from "./playlist.style";
import { CreatePlaylistSchema } from "./validation";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createPlaylistRequest } from "../../stores/playlist/playlistSlice";
import { useEffect, useRef } from "react";
import { Form } from "../Auth/Auth.style";

const CreatePlaylist = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const playlist = useAppSelector((state) => state.playlist);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      isPublished: false,
    },
    validationSchema: CreatePlaylistSchema,
    onSubmit: async (values) => {
      dispatch(createPlaylistRequest(values));
      hasSubmitted.current = true;
    },
  });
  useEffect(() => {
    if (hasSubmitted.current && playlist.playlist && !playlist.loading) {
      router("/dashboard");
      hasSubmitted.current = false; // reset after redirect
    }
  }, [playlist.playlist, playlist.loading, router]);
  useEffect(() => {
    if (playlist.error && playlist.error.field) {
      formik.setFieldError(playlist.error.field, playlist.error.msg);
    }
  }, [playlist.error]);

  return (
    <Background>
      <GlassCard width="420px" height="580px">
        <Text>Create Playlist</Text>
        <Form onSubmit={formik.handleSubmit}>
          <StyledForm>
            <FormikInput
              name="name"
              formik={formik}
              placeholder="Playlist title"
            />

            <FormikTextArea
              name="description"
              formik={formik}
              placeholder="Describe your playlist..."
              inputSize="md"
            />

            <ToggleWrapper>
              <span>Privacy:</span>
              <Toggle
                checked={formik.values.isPublished}
                onClick={() =>
                  formik.setFieldValue(
                    "isPublished",
                    !formik.values.isPublished
                  )
                }
              >
                <ToggleCircle checked={formik.values.isPublished} />
              </Toggle>
              <span>{formik.values.isPublished ? "Public" : "Private"}</span>
            </ToggleWrapper>

            <Button
              width="50"
              type="submit"
              colorScheme="white"
              shape="round"
              glow
              isLoading={playlist.loading}
            >
              Create
            </Button>
          </StyledForm>
        </Form>
      </GlassCard>
    </Background>
  );
};

export default CreatePlaylist;
