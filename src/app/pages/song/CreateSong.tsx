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
import { getArtistsRequest } from "../../stores/artist/artistSlice";
import { getGenresRequest } from "../../stores/genre/genreSlice"; // ✅ make sure you have this slice
import { CreateSongSchema } from "./validation";
import { Flex } from "../../components/ui/Flex.syle.tsx";
import { BiPlus } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

const CreateSong = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const songState = useAppSelector((state) => state.song);
  const artistState = useAppSelector((state) => state.artist);
  const genreState = useAppSelector((state) => state.genre);
  const hasSubmitted = useRef(false);

  const [artistName, setArtistName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [albumName, setAlbumName] = useState("");

  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

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

  // --- Fetch artists when dropdown is opened ---
  const handleArtistDropdown = () => {
    if (!showArtistDropdown) {
      dispatch(getArtistsRequest());
    }
    setShowArtistDropdown((prev) => !prev);
  };

  // --- Fetch genres when dropdown is opened ---
  const handleGenreDropdown = () => {
    if (!showGenreDropdown) {
      dispatch(getGenresRequest());
    }
    setShowGenreDropdown((prev) => !prev);
  };

  return (
    <Background>
      <GlassCard width="420px" height="700px">
        <Text>Create Song</Text>
        <Form onSubmit={formik.handleSubmit}>
          <StyledForm>
            <FormikInput
              name="title"
              formik={formik}
              placeholder="Song title"
            />

            {/* Artist Dropdown */}
            <div style={{ position: "relative", width: "100%" }}>
              <Flex direction="row" gap="10px">
                <FormikInput
                  name="artistId"
                  formik={formik}
                  placeholder="Select Artist"
                  readOnly
                  value={artistName}
                />
                <Button
                  width="50px"
                  type="button"
                  leftIcon={<MdArrowDropDown />}
                  onClick={handleArtistDropdown}
                />
                <Button
                  width="50px"
                  leftIcon={<BiPlus />}
                  type="button"
                  onClick={() => router("/artist/create")}
                />
              </Flex>

              {showArtistDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "0",
                    width: "250px",
                    background: "rgba(0, 0, 0, 1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 100,
                  }}
                >
                  {artistState.loading ? (
                    <div style={{ padding: "8px 12px" }}>Loading...</div>
                  ) : artistState.artists.length > 0 ? (
                    artistState.artists.map((artist) => (
                      <div
                        key={artist._id}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onClick={() => {
                          formik.setFieldValue("artistId", artist._id);
                          setArtistName(artist.name);
                          setShowArtistDropdown(false);
                        }}
                      >
                        {artist.name}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "8px 12px" }}>No artists found</div>
                  )}
                </div>
              )}
            </div>

            {/* Genre Dropdown */}
            <div style={{ position: "relative", width: "100%" }}>
              <Flex direction="row" gap="10px">
                <FormikInput
                  name="genres"
                  formik={formik}
                  placeholder="Select Genre"
                  readOnly
                  value={genreName}
                />
                <Button
                  width="50px"
                  type="button"
                  leftIcon={<MdArrowDropDown />}
                  onClick={handleGenreDropdown}
                />
                <Button
                  width="50px"
                  leftIcon={<BiPlus />}
                  type="button"
                  onClick={() => router("/genre/create")}
                />
              </Flex>

              {showGenreDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "0",
                    width: "250px",
                    background: "rgba(0, 0, 0, 1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 100,
                  }}
                >
                  {genreState.loading ? (
                    <div style={{ padding: "8px 12px" }}>Loading...</div>
                  ) : genreState.genres.length > 0 ? (
                    genreState.genres.map((genre) => (
                      <div
                        key={genre._id}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onClick={() => {
                          formik.setFieldValue("genres", [genre._id]); // store array of genre IDs
                          setGenreName(genre.name);
                          setShowGenreDropdown(false);
                        }}
                      >
                        {genre.name}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "8px 12px" }}>No genres found</div>
                  )}
                </div>
              )}
            </div>

            <Flex direction="row" gap="10px">
              <FormikInput
                name="album"
                formik={formik}
                placeholder="Select Album"
                readOnly
                value={genreName}
              />
              <Button
                width="50px"
                type="button"
                leftIcon={<MdArrowDropDown />}
                onClick={handleGenreDropdown}
              />
              <Button
                width="50px"
                leftIcon={<BiPlus />}
                type="button"
                onClick={() => router("/album/create")}
              />
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
