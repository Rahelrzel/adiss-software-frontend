import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { getArtistStatsRequest } from "../stores/stat/statSlice";

const ArtistStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const stat = useAppSelector((state) => state.stat);

  useEffect(() => {
    dispatch(getArtistStatsRequest());
  }, [dispatch]);

  if (stat.loading) return <div>Loading artist stats...</div>;
  if (stat.error) return <div>Error: {stat.error}</div>;
  if (!stat.artistStats?.length) return null;

  return (
    <div>
      <h3>Artist Statistics</h3>
      <ul>
        {stat.artistStats.map((a) => (
          <li key={a.albumCount}>
            {a.artist} — {a.songCount} songs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistStats;
