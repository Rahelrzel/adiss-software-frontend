import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { fetchSongsRequest } from "../stores/song/songSlice";
import { getArtistsRequest } from "../stores/artist/artistSlice";
import { getAlbumsRequest } from "../stores/album/albumSlice";
import { getGenresRequest } from "../stores/genre/genreSlice";
import { Flex } from "./ui/Flex.style";
import GlassCard from "./GlassCard";
import Button from "./ui/Button";
import {
  DropdownItem,
  DropdownList,
  DropdownWrapper,
  EmptyText,
  LoadingText,
} from "../pages/song/song.style";
import type { SongResponse } from "../types/song.type";

interface Artist {
  _id: string;
  name: string;
}

interface Album {
  _id: string;
  name: string;
  artistId: string | { _id: string; name?: string };
}

interface Genre {
  _id: string;
  name: string;
}

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
  cursor: pointer;
  transition: background 0.2s ease;

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

  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const [filteredSongs, setFilteredSongs] = useState<SongResponse[]>([]);

  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(getArtistsRequest());
    dispatch(getAlbumsRequest());
    dispatch(getGenresRequest());
  }, [dispatch]);

  useEffect(() => {
    let filtered: SongResponse[] = songState.songs;

    if (selectedArtist) {
      filtered = filtered.filter((s) => {
        const artistId =
          typeof s.artistId === "string" ? s.artistId : s.artistId._id;
        return artistId === selectedArtist;
      });
    }

    if (selectedAlbum) {
      filtered = filtered.filter((s) => {
        const albumId =
          typeof s.albumId === "string" ? s.albumId : s.albumId._id;
        return albumId === selectedAlbum;
      });
    }

    if (selectedGenre) {
      filtered = filtered.filter((s) =>
        s.genre?.some((g) =>
          typeof g === "string" ? g === selectedGenre : g._id === selectedGenre
        )
      );
    }

    setFilteredSongs(filtered);
  }, [selectedArtist, selectedAlbum, selectedGenre, songState.songs]);

  const availableAlbums: Album[] = selectedArtist
    ? albumState.albums.filter((a) => {
        const artistId =
          typeof a.artistId === "string" ? a.artistId : a.artistId._id;
        return artistId === selectedArtist;
      })
    : albumState.albums;

  return (
    <Flex direction="column" gap="20px" style={{ width: "100%" }}>
      <h2 style={{ color: "white", fontSize: "24px" }}>Discover Songs</h2>

      <GlassCard width="100%" height="auto">
        <Flex direction="row" gap="16px" wrap="wrap" align="center">
          <DropdownWrapper>
            <Button
              colorScheme="white"
              onClick={() => setShowArtistDropdown((prev) => !prev)}
            >
              {selectedArtist
                ? artistState.artists.find(
                    (a: Artist) => a._id === selectedArtist
                  )?.name
                : "Filter by Artist"}
            </Button>
            {showArtistDropdown && (
              <DropdownList>
                {artistState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : artistState.artists.length > 0 ? (
                  artistState.artists.map((artist: Artist) => (
                    <DropdownItem
                      key={artist._id}
                      onClick={() => {
                        setSelectedArtist(artist._id);
                        setSelectedAlbum("");
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
                ? availableAlbums.find((a) => a._id === selectedAlbum)?.name
                : "Filter by Album"}
            </Button>
            {showAlbumDropdown && (
              <DropdownList>
                {albumState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : availableAlbums.length > 0 ? (
                  availableAlbums.map((album: Album) => (
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
                ? genreState.genres.find((g: Genre) => g._id === selectedGenre)
                    ?.name
                : "Filter by Genre"}
            </Button>
            {showGenreDropdown && (
              <DropdownList>
                {genreState.loading ? (
                  <LoadingText>Loading...</LoadingText>
                ) : genreState.genres.length > 0 ? (
                  genreState.genres.map((genre: Genre) => (
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

          <Button
            onClick={() => {
              setSelectedArtist("");
              setSelectedAlbum("");
              setSelectedGenre("");
            }}
          >
            Clear Filters
          </Button>
        </Flex>

        <SongsContainer>
          {songState.loading ? (
            <LoadingText>Loading songs...</LoadingText>
          ) : filteredSongs.length > 0 ? (
            filteredSongs.map((song: SongResponse) => {
              const artistName =
                typeof song.artistId === "string"
                  ? artistState.artists.find((a) => a._id === song.artistId)
                      ?.name ?? "Unknown"
                  : song.artistId.name ?? "Unknown";

              // const albumName =
              //   typeof song.albumId === "string"
              //     ? albumState.albums.find((a) => a._id === song.albumId)
              //         ?.name ?? "Unknown"
              //     : song.albumId.name ?? "Unknown";

              // const genres = Array.isArray(song.genre)
              //   ? song.genre
              //       .map((g) =>
              //         typeof g === "string"
              //           ? genreState.genres.find((gg) => gg._id === g)?.name ??
              //             "Unknown"
              //           : g.name ?? "Unknown"
              //       )
              //       .join(", ")
              //   : "Unknown";

              return (
                <SongBox
                  key={song._id}
                  onClick={() => {
                    if (song.spotifyUrl) window.open(song.spotifyUrl, "_blank");
                  }}
                >
                  <img
                    src={song.image || "https://via.placeholder.com/200"}
                    alt={song.title}
                  />
                  <Flex direction="row">
                    <Flex direction="column">
                      {" "}
                      <p>{song.title}</p>
                      <small> {artistName}</small>
                    </Flex>
                    {/* <small>{albumName}</small>
                    <small> {genres}</small> */}
                  </Flex>
                </SongBox>
              );
            })
          ) : (
            <EmptyText>No songs found</EmptyText>
          )}
        </SongsContainer>
      </GlassCard>
    </Flex>
  );
};

export default DiscoverPage;
