/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { searchTracksRequest } from "../stores/spotify/spotifySlice";

// 🎨 Styles
const container = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const inputStyle = css`
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

// 🎧 Component
const SpotifySearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const spotifyState = useAppSelector((state) => state.spotify);
  const { tracks, loading, error } = spotifyState;

  const [query, setQuery] = useState("");

  // 🔍 Debounce search (trigger after user stops typing for 500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 1) {
        dispatch(searchTracksRequest(query));
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  return (
    <div css={container}>
      <input
        css={inputStyle}
        type="text"
        placeholder="Search songs on Spotify..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p css={message}>Searching...</p>}
      {error && <p css={message}>⚠️ {error}</p>}

      {!loading && tracks.length === 0 && query.length > 1 && (
        <p css={message}>No results found.</p>
      )}

      <div css={trackList}>
        {tracks.map((track) => (
          <div key={track.id} css={trackItem}>
            <img src={track.image} alt={track.name} css={imageStyle} />
            <div css={textWrap}>
              <span css={title}>{track.name}</span>
              <span css={artist}>{track.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifySearch;
