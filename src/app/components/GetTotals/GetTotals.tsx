import React, { useEffect } from "react";

import {
  TotalsContainer,
  TotalCard,
  CardOverlay,
  CardNumber,
  CardLabel,
} from "./GetTotals.style";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { getTotalsRequest } from "../../stores/stat/statSlice";

const GetTotals: React.FC = () => {
  const dispatch = useAppDispatch();
  const stat = useAppSelector((state) => state.stat);

  useEffect(() => {
    dispatch(getTotalsRequest());
  }, [dispatch]);

  if (stat.loading) return <div>Loading totals...</div>;
  if (stat.error) return <div>Error: {stat.error}</div>;
  if (!stat.totals) return null;

  const totals = [
    {
      label: "Artists",
      value: stat.totals.totalArtists,
      img: "/src/assets/artist.png",
    },
    {
      label: "Albums",
      value: stat.totals.totalAlbums,
      img: "/src/assets/album.png",
    },
    {
      label: "Songs",
      value: stat.totals.totalSongs,
      img: "/src/assets/song.png",
    },
    {
      label: "Genres",
      value: stat.totals.totalGenres,
      img: "/src/assets/genre.png",
    },
  ];

  return (
    <TotalsContainer>
      {totals.map((item) => (
        <TotalCard key={item.label} background={item.img}>
          <CardOverlay />
          <CardNumber>{item.value}</CardNumber>
          <CardLabel>{item.label}</CardLabel>
        </TotalCard>
      ))}
    </TotalsContainer>
  );
};

export default GetTotals;
