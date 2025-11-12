// ---- Dashboard.tsx ----
import PlaylistCard, { Container, PlaylistGrid } from "./dashboard.style";
import GlassCard from "../../components/GlassCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { fetchPlaylistsRequest } from "../../stores/playlist/playlistSlice";
import GetTotals from "../../components/GetTotals/GetTotals";
import { useEffect, useState } from "react";
import cover from "../../../assets/image.png";
import SearchSongs from "../../components/SongSearch";

const Dashboard = () => {
  const route = useNavigate();
  const dispatch = useAppDispatch();
  const { playlist, loading } = useAppSelector((state) => state.playlist);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchPlaylistsRequest());
  }, [dispatch]);

  return (
    <Container>
      <SearchSongs onSearch={setIsSearching} />

      {!isSearching && (
        <GlassCard width="1020px" height="auto">
          <GetTotals />

          <div>Playlists</div>
          {loading ? (
            <div>Loading playlists...</div>
          ) : (
            <PlaylistGrid>
              {playlist.map((p) => {
                const handleClick = () => route(`playlist/${p._id}`);
                return (
                  <div
                    key={p._id}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    <PlaylistCard
                      name={p.name}
                      songCount={p.songs.length}
                      coverImage={cover}
                    />
                  </div>
                );
              })}
            </PlaylistGrid>
          )}
        </GlassCard>
      )}
    </Container>
  );
};

export default Dashboard;
