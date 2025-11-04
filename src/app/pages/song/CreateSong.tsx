import { useFormik } from "formik";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Form } from "../Auth/Auth.style";
import { StyledForm, Text } from "./song.style";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createSongRequest } from "../../stores/song/songSlice";
import { CreateSongSchema } from "./validation";
import { Flex } from "../../components/ui/Flex.syle";
import { BiDownArrow, BiDownArrowAlt, BiPlus } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import PopupModal from "../../components/ui/Modal";
import { createArtistRequest } from "../../stores/artist/artistSlice";

const CreateSong = () => {
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);

  const router = useNavigate();
  const dispatch = useAppDispatch();
  const songState = useAppSelector((state) => state.song);
  const hasSubmitted = useRef(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      artistId: "",
      albumId: "",
      genres: [],
      spotifyUrl: "",
      preview_url: "",
      image: "",
      playlistId: "",
    },
    validationSchema: CreateSongSchema,
    onSubmit: async (values) => {
      dispatch(createSongRequest(values));
      hasSubmitted.current = true;
    },
  });

  // Redirect after successful creation
  useEffect(() => {
    if (hasSubmitted.current && !songState.loading && songState.songs) {
      router("/dashboard");
      hasSubmitted.current = false;
    }
  }, [songState.songs, songState.loading, router]);

  // Display API field errors if any
  useEffect(() => {
    if (songState.error && songState.error.field) {
      formik.setFieldError(songState.error.field, songState.error.msg);
    }
  }, [songState.error]);

  return (
    <Background>
      <GlassCard width="420px" height="650px">
        <Text>Create Song</Text>
        <Form onSubmit={formik.handleSubmit}>
          <StyledForm>
            <FormikInput
              name="title"
              formik={formik}
              placeholder="Song title"
            />
            <Flex direction="row" gap="10px">
              <FormikInput
                name="artistId"
                formik={formik}
                placeholder="Artist "
              />
              <Button width="50px" leftIcon={<MdArrowDropDown />} />
              <Button
                width="50px"
                leftIcon={<BiPlus onClick={() => setIsArtistModalOpen(true)} />}
              />
              <PopupModal
                isOpen={isArtistModalOpen}
                onClose={() => setIsArtistModalOpen(false)}
                title="Create Artist"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const artistName = (e.target as any).elements.artistName
                      .value;
                    dispatch(
                      createArtistRequest({
                        name: artistName,
                        userId: "currentUserId",
                      })
                    );
                    setIsArtistModalOpen(false);
                  }}
                >
                  <FormikInput
                    name="artistName"
                    formik={formik}
                    placeholder="Artist Name"
                  />
                  <Button type="submit" colorScheme="white" glow>
                    Create
                  </Button>
                </form>
              </PopupModal>
            </Flex>

            <Flex direction="row" gap="10px">
              <FormikInput name="albumId" formik={formik} placeholder="Album" />
              <Button width="50px" leftIcon={<MdArrowDropDown />} />
              <Button width="50px" leftIcon={<BiPlus />} />
            </Flex>
            <Flex direction="row" gap="10px">
              <FormikInput name="genres" formik={formik} placeholder="Genres" />
              <Button width="50px" leftIcon={<MdArrowDropDown />} />
              <Button width="50px" leftIcon={<BiPlus />} />
            </Flex>
            <FormikInput
              name="spotifyUrl"
              formik={formik}
              placeholder="Spotify URL"
            />
            <FormikInput
              name="preview_url"
              formik={formik}
              placeholder="Preview URL"
            />
            <FormikInput name="image" formik={formik} placeholder="Image URL" />

            <Button
              width="50"
              type="submit"
              colorScheme="white"
              shape="round"
              glow
              isLoading={songState.loading}
            >
              Create
            </Button>
          </StyledForm>
        </Form>
      </GlassCard>
    </Background>
  );
};

export default CreateSong;
