import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { getSongsByGenreRequest } from "../stores/stat/statSlice";

const SongsByGenre: React.FC = () => {
  const dispatch = useAppDispatch();
  const stat = useAppSelector((state) => state.stat);

  useEffect(() => {
    dispatch(getSongsByGenreRequest());
  }, [dispatch]);

  if (stat.loading) return <div>Loading songs by genre...</div>;
  if (stat.error) return <div>Error: {stat.error}</div>;
  if (!stat.songsByGenre?.length) return null;

  return (
    <div>
      <h3>Songs by Genre</h3>
      <ul>
        {stat.songsByGenre.map((g) => (
          <li key={g.genre}>
            {g.genre}: {g.songCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsByGenre;
