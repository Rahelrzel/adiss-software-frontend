import { useFormik } from "formik";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Form } from "../Auth/Auth.style";
import {
  StyledForm,
  Text,
  DropdownWrapper,
  DropdownList,
  DropdownItem,
  LoadingText,
  EmptyText,
} from "./song.style";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { createSongRequest } from "../../stores/song/songSlice";
import { getArtistsRequest } from "../../stores/artist/artistSlice";
import { getGenresRequest } from "../../stores/genre/genreSlice";
import { getAlbumsRequest } from "../../stores/album/albumSlice"; // ✅ new import
import { CreateSongSchema } from "./validation";
import { Flex } from "../../components/ui/Flex.syle.tsx";
import { BiPlus } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

const CreateSong = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const songState = useAppSelector((state) => state.song);
  const artistState = useAppSelector((state) => state.artist);
  const genreState = useAppSelector((state) => state.genre);
  const albumState = useAppSelector((state) => state.album);

  const hasSubmitted = useRef(false);

  const [artistName, setArtistName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [albumName, setAlbumName] = useState("");

  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      artistId: "",
      albumId: "",
      genre: [], // ✅ match backend ("genre", not "genres")
      spotifyUrl: "",
      image: "",
      playlistId: playlistId || "",
    },
    validationSchema: CreateSongSchema,
    onSubmit: async (values) => {
      console.log("Submitting values:", values);
      const payload = {
        title: values.title,
        artistId: values.artistId, // ✅ match backend
        albumId: values.albumId, // ✅ match backend
        genre: values.genre, // ✅ match backend
        spotifyUrl: values.spotifyUrl,
        image: values.image,
        playlistId: values.playlistId || undefined,
      };

      dispatch(createSongRequest(payload));
      hasSubmitted.current = true;
    },
  });

  useEffect(() => {
    if (hasSubmitted.current && !songState.loading && songState.songs) {
      router("/dashboard");
      hasSubmitted.current = false;
    }
  }, [songState.songs, songState.loading, router]);

  useEffect(() => {
    if (songState.error && songState.error.field) {
      formik.setFieldError(songState.error.field, songState.error.msg);
    }
  }, [songState.error]);

  // Dropdown togglers
  const handleArtistDropdown = () => {
    if (!showArtistDropdown) dispatch(getArtistsRequest());
    setShowArtistDropdown((prev) => !prev);
  };

  const handleGenreDropdown = () => {
    if (!showGenreDropdown) dispatch(getGenresRequest());
    setShowGenreDropdown((prev) => !prev);
  };

  const handleAlbumDropdown = () => {
    if (!showAlbumDropdown) dispatch(getAlbumsRequest());
    setShowAlbumDropdown((prev) => !prev);
  };

  return (
    <Background>
      <GlassCard width="420px" height="780px">
        <Text>Create Song</Text>
        <Form onSubmit={formik.handleSubmit}>
          <StyledForm>
            <FormikInput
              name="title"
              formik={formik}
              placeholder="Song title"
            />

            {/* 🎤 Artist Dropdown */}
            <DropdownWrapper>
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
                <DropdownList>
                  {artistState.loading ? (
                    <LoadingText>Loading...</LoadingText>
                  ) : artistState.artists.length > 0 ? (
                    artistState.artists.map((artist) => (
                      <DropdownItem
                        key={artist._id}
                        onClick={() => {
                          formik.setFieldValue("artistId", artist._id);
                          setArtistName(artist.name);
                          setShowArtistDropdown(false);
                        }}
                      >
                        {artist.name}
                      </DropdownItem>
                    ))
                  ) : (
                    <EmptyText>No artists found</EmptyText>
                  )}
                </DropdownList>
              )}
            </DropdownWrapper>

            {/* 🎶 Genre Dropdown */}
            <DropdownWrapper>
              <Flex direction="row" gap="10px">
                <FormikInput
                  name="genre"
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
                <DropdownList>
                  {genreState.loading ? (
                    <LoadingText>Loading...</LoadingText>
                  ) : genreState.genres.length > 0 ? (
                    genreState.genres.map((genre) => (
                      <DropdownItem
                        key={genre._id}
                        onClick={() => {
                          formik.setFieldValue("genre", [genre._id]);
                          setGenreName(genre.name);
                          setShowGenreDropdown(false);
                        }}
                      >
                        {genre.name}
                      </DropdownItem>
                    ))
                  ) : (
                    <EmptyText>No genres found</EmptyText>
                  )}
                </DropdownList>
              )}
            </DropdownWrapper>

            {/* 💿 Album Dropdown */}
            <DropdownWrapper>
              <Flex direction="row" gap="10px">
                <FormikInput
                  name="albumId"
                  formik={formik}
                  placeholder="Select Album"
                  readOnly
                  value={albumName}
                />
                <Button
                  width="50px"
                  type="button"
                  leftIcon={<MdArrowDropDown />}
                  onClick={handleAlbumDropdown}
                />
                <Button
                  width="50px"
                  leftIcon={<BiPlus />}
                  type="button"
                  onClick={() =>
                    router("/album/create", {
                      state: { artistId: formik.values.artistId },
                    })
                  }
                />
              </Flex>

              {showAlbumDropdown && (
                <DropdownList>
                  {albumState.loading ? (
                    <LoadingText>Loading...</LoadingText>
                  ) : albumState.albums.length > 0 ? (
                    albumState.albums.map((album) => (
                      <DropdownItem
                        key={album._id}
                        onClick={() => {
                          formik.setFieldValue("albumId", album._id);
                          setAlbumName(album.name);
                          setShowAlbumDropdown(false);
                        }}
                      >
                        {album.name}
                      </DropdownItem>
                    ))
                  ) : (
                    <EmptyText>No albums found</EmptyText>
                  )}
                </DropdownList>
              )}
            </DropdownWrapper>

            <FormikInput
              name="spotifyUrl"
              formik={formik}
              placeholder="Spotify URL"
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
