import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { searchTracksRequest } from "../stores/spotify/spotifySlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 16px;
  background: #0b0b0b;
  color: #fff;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1db954;
  }
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  margin-top: 5px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.span`
  font-size: 13px;
  color: #aaa;
`;

const Message = styled.p`
  color: #aaa;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SpotifySearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const spotifyState = useAppSelector((state) => state.spotify);
  const { tracks, loading, error } = spotifyState;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 1) {
        dispatch(searchTracksRequest(query));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search songs on Spotify..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <Message>Searching...</Message>}
      {error && <Message> {error}</Message>}

      {!loading && tracks.length === 0 && query.length > 1 && (
        <Message>No results found.</Message>
      )}

      <TrackList>
        {tracks.map((track) => (
          <TrackItem key={track.id}>
            <TrackImage src={track.image} alt={track.title} />
            <TextWrap>
              <Title>{track.title}</Title>
              <Artist>{track.artist}</Artist>
            </TextWrap>
          </TrackItem>
        ))}
      </TrackList>
    </Container>
  );
};

export default SpotifySearch;
