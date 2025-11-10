import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { fetchSongsRequest } from "../stores/song/songSlice";
import { getArtistsRequest } from "../stores/artist/artistSlice";
import { getAlbumsRequest } from "../stores/album/albumSlice";
import { getGenresRequest } from "../stores/genre/genreSlice";
import { Flex } from "./ui/Flex.syle";
import GlassCard from "./GlassCard";
import Button from "./ui/Button";
import {
  DropdownItem,
  DropdownList,
  DropdownWrapper,
  EmptyText,
  LoadingText,
} from "../pages/song/song.style";

const SongsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 30px;
`;

const SongBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 100%;
    height: 120px;
    border-radius: 10px;
    object-fit: cover;
  }

  p {
    color: white;
    font-weight: 500;
    margin-top: 8px;
    text-align: center;
  }

  small {
    color: #aaa;
  }
`;

const DiscoverPage = () => {
  const dispatch = useAppDispatch();
  const songState = useAppSelector((state) => state.song);
  const artistState = useAppSelector((state) => state.artist);
  const albumState = useAppSelector((state) => state.album);
  const genreState = useAppSelector((state) => state.genre);

  const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  // Fetch all data on load
  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(getArtistsRequest());
    dispatch(getAlbumsRequest());
    dispatch(getGenresRequest());
  }, [dispatch]);

  // Filter logic
  useEffect(() => {
    let filtered = songState.songs;

    if (selectedArtist) {
      filtered = filtered.filter(
        (s) =>
          (typeof s.artistId === "string" ? s.artistId : s.artistId?._id) ===
          selectedArtist
      );
    }

    if (selectedAlbum) {
      filtered = filtered.filter(
        (s) =>
          (typeof s.albumId === "string" ? s.albumId : s.albumId?._id) ===
          selectedAlbum
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((s) =>
        s.genre?.some((g: any) =>
          typeof g === "string" ? g === selectedGenre : g._id === selectedGenre
        )
      );
    }

    setFilteredSongs(filtered);
  }, [selectedArtist, selectedAlbum, selectedGenre, songState.songs]);

  const songsToRender = filteredSongs.length
    ? filteredSongs
    : songState.songs || [];

  return (
    <Flex direction="column" gap="20px" style={{ width: "100%" }}>
      <h2 style={{ color: "white", fontSize: "24px" }}>Discover Songs</h2>

      {/* 🔹 One GlassCard for Everything */}
      <GlassCard width="100%" height="auto">
        {/* Filters */}
        <Flex direction="row" gap="16px" wrap="wrap" align="center">
          {/* Artist Filter */}
          <DropdownWrapper>
            <Button
              colorScheme="white"
              onClick={() => setShowArtistDropdown((prev) => !prev)}
            >
              {selectedArtist
                ? artistState.artists.find((a) => a._id === selectedArtist)
                    ?.name
                : "Filter by Artist"}
            </Button>
            {showArtistDropdown && (
              <DropdownList>
                {artistState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : artistState.artists.length > 0 ? (
                  artistState.artists.map((artist) => (
                    <DropdownItem
                      key={artist._id}
                      onClick={() => {
                        setSelectedArtist(artist._id);
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

          {/* Album Filter */}
          <DropdownWrapper>
            <Button
              colorScheme="white"
              onClick={() => setShowAlbumDropdown((prev) => !prev)}
            >
              {selectedAlbum
                ? albumState.albums.find((a) => a._id === selectedAlbum)?.name
                : "Filter by Album"}
            </Button>
            {showAlbumDropdown && (
              <DropdownList>
                {albumState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : albumState.albums.length > 0 ? (
                  albumState.albums.map((album) => (
                    <DropdownItem
                      key={album._id}
                      onClick={() => {
                        setSelectedAlbum(album._id);
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

          {/* Genre Filter */}
          <DropdownWrapper>
            <Button
              colorScheme="white"
              onClick={() => setShowGenreDropdown((prev) => !prev)}
            >
              {selectedGenre
                ? genreState.genres.find((g) => g._id === selectedGenre)?.name
                : "Filter by Genre"}
            </Button>
            {showGenreDropdown && (
              <DropdownList>
                {genreState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : genreState.genres.length > 0 ? (
                  genreState.genres.map((genre) => (
                    <DropdownItem
                      key={genre._id}
                      onClick={() => {
                        setSelectedGenre(genre._id);
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

          {/* Clear Filters */}
          <Button
            colorScheme="red"
            onClick={() => {
              setSelectedArtist("");
              setSelectedAlbum("");
              setSelectedGenre("");
            }}
          >
            Clear Filters
          </Button>
        </Flex>

        {/* Songs Grid Inside the Same Glass */}
        <SongsContainer>
          {songState.loading ? (
            <LoadingText>Loading songs...</LoadingText>
          ) : songsToRender.length > 0 ? (
            songsToRender.map((song) => (
              <SongBox key={song._id}>
                <img
                  src={song.image || "https://via.placeholder.com/200"}
                  alt={song.title}
                />
                <p>{song.title}</p>
                <small>
                  {typeof song.artistId === "string" ? "" : song.artistId?.name}
                </small>
              </SongBox>
            ))
          ) : (
            <EmptyText>No songs found</EmptyText>
          )}
        </SongsContainer>
      </GlassCard>
    </Flex>
  );
};

export default DiscoverPage;
