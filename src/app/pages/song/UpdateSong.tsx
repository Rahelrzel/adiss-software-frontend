import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import GlassCard from "../../components/GlassCard";
import { FormikInput } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Flex } from "../../components/ui/Flex.syle.tsx";
import { BiPlus } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

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
import { getArtistsRequest } from "../../stores/artist/artistSlice";
import { getGenresRequest } from "../../stores/genre/genreSlice";
import { getAlbumsRequest } from "../../stores/album/albumSlice";
import {
  fetchSongByIdRequest,
  updateSongRequest,
} from "../../stores/song/songSlice";
import { CreateSongSchema } from "./validation";

import CreateAlbumModal from "./CreateAlbumPage.tsx";
import CreateArtistModal from "./CreateArtistPage.tsx";
import CreateGenreModal from "./CreateGenrepage.tsx";
import SpotifySearch from "./SpotifySeach.tsx";

// -------------------- TYPES --------------------
interface PopulatedArtist {
  _id: string;
  name: string;
}
interface PopulatedAlbum {
  _id: string;
  name: string;
}
interface PopulatedGenre {
  _id: string;
  name: string;
}

interface SongFormValues {
  title: string;
  artistId: string;
  albumId: string;
  genre: string[];
  spotifyUrl?: string;
  image?: string;
  playlistId?: string;
}

// -------------------- COMPONENT --------------------
const UpdateSong = () => {
  const { id, playlistId } = useParams<{ id: string; playlistId?: string }>();
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const songState = useAppSelector((state) => state.song);
  const artistState = useAppSelector((state) => state.artist);
  const genreState = useAppSelector((state) => state.genre);
  const albumState = useAppSelector((state) => state.album);

  const hasSubmitted = useRef(false);

  const [isArtistModalOpen, setArtistModalOpen] = useState(false);
  const [isAlbumModalOpen, setAlbumModalOpen] = useState(false);
  const [isGenreModalOpen, setGenreModalOpen] = useState(false);

  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [genreName, setGenreName] = useState("");

  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false);

  // -------------------- FETCH SONG --------------------
  useEffect(() => {
    if (id) dispatch(fetchSongByIdRequest(id));
  }, [dispatch, id]);

  // -------------------- FORM --------------------
  const formik = useFormik<SongFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: songState.currentSong?.title || "",
      artistId:
        typeof songState.currentSong?.artistId === "string"
          ? songState.currentSong.artistId
          : (songState.currentSong?.artistId as PopulatedArtist)?._id || "",
      albumId:
        typeof songState.currentSong?.albumId === "string"
          ? songState.currentSong.albumId
          : (songState.currentSong?.albumId as PopulatedAlbum)?._id || "",
      genre: Array.isArray(songState.currentSong?.genre)
        ? (songState.currentSong.genre as (string | PopulatedGenre)[]).map(
            (g) => (typeof g === "string" ? g : g._id)
          )
        : [],
      spotifyUrl: songState.currentSong?.spotifyUrl || "",
      image: songState.currentSong?.image || "",
      playlistId: playlistId || "",
    },
    validationSchema: CreateSongSchema,
    onSubmit: (values) => {
      if (!id) return;

      // ✅ Clean payload for backend validation
      const payload = {
        ...values,
        artistId:
          typeof values.artistId === "string"
            ? values.artistId
            : (values.artistId as any)?._id,
        albumId:
          typeof values.albumId === "string"
            ? values.albumId
            : (values.albumId as any)?._id,
        genre: Array.isArray(values.genre)
          ? values.genre.map((g: any) => (typeof g === "string" ? g : g?._id))
          : [],
      };

      console.log("🟢 Update payload sent to backend:", payload);
      dispatch(updateSongRequest({ id, data: payload }));
      hasSubmitted.current = true;
    },
  });

  // -------------------- SET DISPLAY NAMES --------------------
  useEffect(() => {
    const song = songState.currentSong;
    if (!song) return;

    setArtistName(
      typeof song.artistId === "string"
        ? ""
        : (song.artistId as PopulatedArtist).name || ""
    );
    setAlbumName(
      typeof song.albumId === "string"
        ? ""
        : (song.albumId as PopulatedAlbum).name || ""
    );
    setGenreName(
      Array.isArray(song.genre)
        ? (song.genre as (string | PopulatedGenre)[])
            .map((g) => (typeof g === "string" ? "" : g.name))
            .join(", ")
        : ""
    );
  }, [songState.currentSong]);

  // -------------------- NAVIGATE AFTER UPDATE --------------------
  useEffect(() => {
    if (hasSubmitted.current && !songState.loading && !songState.error) {
      router(`/dashboard/playlist/${playlistId || ""}`);
      hasSubmitted.current = false;
    }
  }, [songState.loading, songState.error, router, playlistId]);

  if (songState.loading)
    return <p style={{ color: "white" }}>Loading song data...</p>;

  // -------------------- RENDER --------------------
  return (
    <Flex direction="row" gap="20px">
      <GlassCard width="600px" height="500px">
        <Text>Update Song</Text>
        <form onSubmit={formik.handleSubmit}>
          <StyledForm>
            <FormikInput
              name="title"
              formik={formik}
              placeholder="Song title"
            />
            <FormikInput
              name="spotifyUrl"
              formik={formik}
              placeholder="Spotify URL"
            />
            <FormikInput name="image" formik={formik} placeholder="Image URL" />

            {/* Artist Dropdown */}
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
                  onClick={() => {
                    if (!showArtistDropdown) dispatch(getArtistsRequest());
                    setShowArtistDropdown((prev) => !prev);
                  }}
                />
                <Button
                  width="50px"
                  onClick={() => setArtistModalOpen(true)}
                  leftIcon={<BiPlus />}
                />
                <CreateArtistModal
                  isOpen={isArtistModalOpen}
                  onClose={() => setArtistModalOpen(false)}
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

            {/* Genre Dropdown */}
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
                  onClick={() => {
                    if (!showGenreDropdown) dispatch(getGenresRequest());
                    setShowGenreDropdown((prev) => !prev);
                  }}
                />
                <Button
                  width="50px"
                  onClick={() => setGenreModalOpen(true)}
                  leftIcon={<BiPlus />}
                />
                <CreateGenreModal
                  isOpen={isGenreModalOpen}
                  onClose={() => setGenreModalOpen(false)}
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

            {/* Album Dropdown */}
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
                  onClick={() => {
                    if (!showAlbumDropdown) dispatch(getAlbumsRequest());
                    setShowAlbumDropdown((prev) => !prev);
                  }}
                />
                <Button
                  width="50px"
                  onClick={() => {
                    if (!formik.values.artistId)
                      return alert("Select artist first!");
                    setAlbumModalOpen(true);
                  }}
                  leftIcon={<BiPlus />}
                />
                <CreateAlbumModal
                  isOpen={isAlbumModalOpen}
                  onClose={() => setAlbumModalOpen(false)}
                  artistId={formik.values.artistId}
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

            <Button
              width="50"
              type="submit"
              colorScheme="white"
              shape="round"
              glow
              isLoading={songState.loading}
            >
              Update
            </Button>
          </StyledForm>
        </form>
      </GlassCard>

      {/* Spotify Search */}
      <GlassCard width="300px">
        <SpotifySearch
          onSelectTrack={(track) => {
            formik.setFieldValue("title", track.title);
            formik.setFieldValue("spotifyUrl", track.spotifyUrl);
            formik.setFieldValue("image", track.image);
          }}
        />
      </GlassCard>
    </Flex>
  );
};

export default UpdateSong;
