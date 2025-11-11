import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/utils/hooks";
import {
  fetchPlaylistByIdRequest,
  removeSongFromPlaylistRequest,
} from "../../../stores/playlist/playlistSlice";
import { Flex } from "../../../components/ui/Flex.style";
import PlaylistCard from "../../Dashboard/dashboard.style";
import GlassCard from "../../../components/GlassCard";
import Button from "../../../components/ui/Button";

import {
  SongRow,
  SongInfo,
  OptionsButton,
  OptionsMenu,
  SongCard,
} from "./playlistById.style";
import { BsThreeDotsVertical } from "react-icons/bs";
import cover from "../../../../assets/image.png";

const PlaylistById = () => {
  const router = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentPlaylist: playlist, loading } = useAppSelector(
    (state) => state.playlist
  );
  const { user } = useAppSelector((state) => state.user);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (id) dispatch(fetchPlaylistByIdRequest(id));
  }, [dispatch, id]);

  const handleMenuToggle = (songId: string) => {
    setOpenMenuId((prev) => (prev === songId ? null : songId));
  };

  const handleDelete = (songId: string) => {
    if (!playlist?._id) return;
    dispatch(
      removeSongFromPlaylistRequest({ playlistId: playlist._id, songId })
    );
    setOpenMenuId(null);
  };

  if (loading) {
    return <p style={{ color: "white" }}>Loading playlist...</p>;
  }

  if (!playlist) {
    return <p style={{ color: "white" }}>Playlist not found</p>;
  }

  const songs = playlist.songs?.filter(Boolean) || [];
  const isOwner = user?.id === playlist.userId._id;

  return (
    <GlassCard width="1020px" height="auto">
      <Flex direction="column" gap="20px">
        <Flex direction="row" gap="50px">
          <PlaylistCard
            name={playlist.name}
            songCount={songs.length}
            coverImage={cover}
          />

          <Flex direction="column" gap="20px">
            <h2 style={{ color: "white" }}>{playlist.name}</h2>
            <p style={{ color: "white" }}>{playlist.description}</p>
            <p style={{ color: "white" }}>Songs: {songs.length}</p>

            {isOwner && (
              <Button
                shape="round"
                colorScheme="white"
                onClick={() => router(`/dashboard/createSong/${playlist._id}`)}
              >
                Add song
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex direction="column" gap="15px">
          {songs.length > 0 ? (
            songs.map((song) => (
              <SongRow key={song._id}>
                <SongInfo
                  onClick={() =>
                    song.spotifyUrl && window.open(song.spotifyUrl, "_blank")
                  }
                  style={{ flex: 1 }}
                >
                  <SongCard image={song.image || "/src/assets/theGirl.jpg"} />

                  <Flex direction="column">
                    <div style={{ color: "white" }}>
                      {song.title || "Untitled"}
                    </div>
                    <div style={{ color: "#ccc" }}>
                      {typeof song.artistId === "string"
                        ? "Unknown"
                        : song.artistId?.name || "Unknown"}
                    </div>
                  </Flex>

                  <Flex direction="column">
                    <div>Album</div>
                    <div style={{ color: "#ccc" }}>
                      {typeof song.albumId === "string"
                        ? "Unknown"
                        : song.albumId?.name || "Unknown"}
                    </div>
                  </Flex>

                  <Flex direction="column">
                    <div>Genre</div>
                    <div style={{ color: "#ccc" }}>
                      {Array.isArray(song.genre)
                        ? song.genre
                            .filter(Boolean)
                            .map((g) =>
                              typeof g === "string"
                                ? "Unknown"
                                : g?.name || "Unknown"
                            )
                            .join(", ")
                        : "Unknown"}
                    </div>
                  </Flex>
                </SongInfo>

                {isOwner && (
                  <>
                    <OptionsButton onClick={() => handleMenuToggle(song._id)}>
                      <BsThreeDotsVertical />
                    </OptionsButton>

                    {openMenuId === song._id && (
                      <OptionsMenu>
                        <button
                          onClick={() =>
                            router(
                              `/dashboard/updateSong/${song._id}/${playlist?._id}`
                            )
                          }
                        >
                          Update
                        </button>
                        <button onClick={() => handleDelete(song._id)}>
                          Delete
                        </button>
                      </OptionsMenu>
                    )}
                  </>
                )}
              </SongRow>
            ))
          ) : (
            <p style={{ color: "#bbb" }}>No songs in this playlist yet.</p>
          )}
        </Flex>
      </Flex>
    </GlassCard>
  );
};

export default PlaylistById;
