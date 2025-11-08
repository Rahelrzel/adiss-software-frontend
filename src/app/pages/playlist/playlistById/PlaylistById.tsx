import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/utils/hooks";
import { fetchPlaylistByIdRequest } from "../../../stores/playlist/playlistSlice";
import { Flex } from "../../../components/ui/Flex.syle";
import PlaylistCard from "../../Dashboard/dashboard.style";
import GlassCard from "../../../components/GlassCard";
import Button from "../../../components/ui/Button";
import { SongCard } from "./playlistById.style";

const PlaylistById = () => {
  const router = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { currentPlaylist: playlist, loading } = useAppSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    if (id) dispatch(fetchPlaylistByIdRequest(id));
  }, [dispatch, id]);

  if (loading) {
    return <p style={{ color: "white" }}>Loading playlist...</p>;
  }

  if (!playlist) {
    return <p style={{ color: "white" }}>Playlist not found</p>;
  }

  return (
    <GlassCard width="1020px" height="auto">
      <Flex direction="column" gap="20px">
        <Flex direction="row" gap="50px">
          <PlaylistCard
            name={playlist.name}
            songCount={playlist.songs?.length || 0}
            coverImage={"/src/assets/image.png"}
          />

          <Flex direction="column" gap="20px">
            <h2 style={{ color: "white" }}>{playlist.name}</h2>
            <p style={{ color: "white" }}>{playlist.description}</p>
            <p style={{ color: "white" }}>
              Songs: {playlist.songs?.length || 0}
            </p>
            <Button
              shape="round"
              colorScheme="white"
              onClick={() => router(`/dashboard/createSong/${playlist._id}`)}
            >
              Add song
            </Button>
          </Flex>
        </Flex>
        <Flex direction="column" gap="15px">
          {playlist.songs?.map((song) => (
            <Flex
              key={song._id}
              direction="row"
              gap="30px"
              align="center"
              style={{ cursor: song.spotifyUrl ? "pointer" : "default" }}
              onClick={() => {
                if (song.spotifyUrl) window.open(song.spotifyUrl, "_blank");
              }}
            >
              <SongCard image={song.image || "/src/assets/theGirl.jpg"} />

              <Flex direction="column">
                <div style={{ color: "white" }}>{song.title}</div>
                <div style={{ color: "#ccc" }}>
                  {typeof song.artistId === "string"
                    ? "Unknown"
                    : song.artistId.name}
                </div>
              </Flex>

              <Flex direction="column">
                <div>Album</div>
                <div style={{ color: "#ccc" }}>
                  {typeof song.albumId === "string"
                    ? "Unknown"
                    : song.albumId.name}
                </div>
              </Flex>

              <Flex direction="column">
                <div>Genre</div>
                <div style={{ color: "#ccc" }}>
                  {song.genre
                    .map((g) => (typeof g === "string" ? "Unknown" : g.name))
                    .join(", ") || "Unknown"}
                </div>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </GlassCard>
  );
};

export default PlaylistById;
