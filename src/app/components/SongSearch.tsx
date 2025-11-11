/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../stores/utils/hooks";
import { fetchSongsRequest, fetchSongsSuccess } from "../stores/song/songSlice";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 300px;
  padding: 15px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #ffffffff;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled(FiSearch)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`;

const SongCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const SongImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.span`
  font-size: 14px;
  color: #aaa;
`;

const Message = styled.p`
  color: #aaa;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SearchSongs: React.FC<{ onSearch: (isSearching: boolean) => void }> = ({
  onSearch,
}) => {
  const dispatch = useAppDispatch();
  const { songs, loading } = useAppSelector((state) => state.song);
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query.trim().length > 0);
    const timeout = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchSongsRequest({ search: query }));
      } else {
        dispatch(fetchSongsSuccess([]));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, dispatch, onSearch]);

  return (
    <>
      <SearchBox>
        <SearchIcon />
        <SearchInput
          type="text"
          value={query}
          placeholder="Search songs..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </SearchBox>

      {loading && <Message>Searching...</Message>}
      {!loading && songs.length === 0 && query.trim().length > 0 && (
        <Message>No results found.</Message>
      )}

      <ResultsContainer>
        {songs.map((s) => (
          <SongCard
            key={s._id}
            onClick={() => s.spotifyUrl && window.open(s.spotifyUrl, "_blank")}
          >
            <SongImage
              src={s.image || "https://via.placeholder.com/60"}
              alt={s.title}
            />
            <SongInfo>
              <Title>{s.title}</Title>
              <Artist>
                {typeof s.artistId === "string"
                  ? "Unknown Artist"
                  : s.artistId?.name || "Unknown Artist"}
              </Artist>
            </SongInfo>
          </SongCard>
        ))}
      </ResultsContainer>
    </>
  );
};

export default SearchSongs;
