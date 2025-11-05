import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/utils/hooks";
import { fetchPlaylistByIdRequest } from "../../../stores/playlist/playlistSlice";
import { Flex } from "../../../components/ui/Flex.syle";
import PlaylistCard from "../../Dashboard/dashboard.style";
import Background from "../../../components/Background";
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
    return (
      <Background>
        <GlassCard width="800px" height="400px">
          <p style={{ color: "white" }}>Loading playlist...</p>
        </GlassCard>
      </Background>
    );
  }

  if (!playlist) {
    return (
      <Background>
        <GlassCard width="800px" height="400px">
          <p style={{ color: "white" }}>Playlist not found</p>
        </GlassCard>
      </Background>
    );
  }

  return (
    <Background>
      <GlassCard width="800px" height="auto">
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
              <Button onClick={() => router("/createSong")}>Add song</Button>
            </Flex>
          </Flex>

          <Flex direction="column" gap="15px">
            {playlist.songs?.map((song) => (
              <Flex key={song._id} direction="row" gap="30px" align="center">
                <SongCard image={"/src/assets/default-song.png"} />
                <Flex direction="column">
                  <div style={{ color: "white" }}>{song.title}</div>
                  <div style={{ color: "#ccc" }}>{song.artistId}</div>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </GlassCard>
    </Background>
  );
};

export default PlaylistById;
