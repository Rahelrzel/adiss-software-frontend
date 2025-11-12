import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { getAlbumStatsRequest } from "../stores/stat/statSlice";

const AlbumStats = () => {
  const dispatch = useAppDispatch();
  const stat = useAppSelector((state) => state.stat);

  useEffect(() => {
    dispatch(getAlbumStatsRequest());
  }, [dispatch]);

  if (stat.loading) return <div>Loading album stats...</div>;
  if (stat.error) return <div>Error: {stat.error}</div>;
  if (!stat.albumStats?.length) return null;

  return (
    <div>
      <h3>Album Statistics</h3>
      <ul>
        {stat.albumStats.map((a) => (
          <li key={a.album}>
            {a.album} — {a.songCount} songs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumStats;
