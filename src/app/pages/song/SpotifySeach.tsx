/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { searchTracksRequest } from "../../stores/spotify/spotifySlice";

const container = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const inputStyle = css`
  padding: 10px 14px;
  border: 1px solid #fdfdfdff;
  border-radius: 10px;
  font-size: 16px;
  background: #ffffff37;
  color: #ffffffff;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #ffffffff;
  }
`;

const trackList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  margin-top: 5px;
`;

const trackItem = css`
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

const imageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
`;

const textWrap = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const title = css`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const artist = css`
  font-size: 13px;
  color: #aaa;
`;

const message = css`
  color: #aaa;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

interface SpotifySearchProps {
  onSelectTrack: (track: {
    title: string;
    artist: string;
    spotifyUrl: string;
    image?: string;
  }) => void;
}

const SpotifySearch: React.FC<SpotifySearchProps> = ({ onSelectTrack }) => {
  const dispatch = useAppDispatch();
  const spotifyState = useAppSelector((state) => state.spotify);
  const { tracks, loading, error } = spotifyState;
  const [trackSelected, setTrackSelected] = useState(false);

  const [query, setQuery] = useState("");

  // 🔍 Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 1) {
        dispatch(searchTracksRequest(query));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const handleSelectTrack = (track: any) => {
    if (onSelectTrack) onSelectTrack(track);
    setTrackSelected(true);

    setQuery("");
  };
  return (
    <div css={container}>
      <input
        css={inputStyle}
        type="text"
        placeholder="Search songs on Spotify..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value), setTrackSelected(false);
        }}
      />
      {loading && !trackSelected && <p css={message}>Searching...</p>}
      {error && !trackSelected && <p css={message}>⚠️ {error}</p>}

      {!loading &&
        !trackSelected &&
        tracks.length === 0 &&
        query.length > 1 && <p css={message}>No results found.</p>}

      {!trackSelected && (
        <div css={trackList}>
          {tracks.map((track) => (
            <div
              key={track.id}
              css={trackItem}
              onClick={() =>
                handleSelectTrack({
                  title: track.title,
                  artist: track.artist,
                  spotifyUrl: track.spotifyUrl,
                  image: track.image,
                })
              }
            >
              <img src={track.image} alt={track.title} css={imageStyle} />
              <div css={textWrap}>
                <span css={title}>{track.title}</span>
                <span css={artist}>{track.artist}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
