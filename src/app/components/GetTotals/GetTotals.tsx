import { useEffect } from "react";

import artistImg from "../../../assets/artist.png";
import albumImg from "../../../assets/album.png";
import songImg from "../../../assets/song.png";
import genreImg from "../../../assets/genre.png";

import {
  TotalsContainer,
  TotalCard,
  CardOverlay,
  CardNumber,
  CardLabel,
} from "./GetTotals.style";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { getTotalsRequest } from "../../stores/stat/statSlice";

const GetTotals = () => {
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
      img: artistImg,
    },
    {
      label: "Albums",
      value: stat.totals.totalAlbums,
      img: albumImg,
    },
    {
      label: "Songs",
      value: stat.totals.totalSongs,
      img: songImg,
    },
    {
      label: "Genres",
      value: stat.totals.totalGenres,
      img: genreImg,
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
