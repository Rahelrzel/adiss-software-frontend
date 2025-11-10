import styled from "@emotion/styled";

export const SongCardContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(254, 254, 254, 0.17);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  backdrop-filter: blur(6px);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const SongImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface SongCardProps {
  image: string;
}

export const SongCard: React.FC<SongCardProps> = ({ image }) => {
  return (
    <SongCardContainer>
      <SongImage src={image} alt="Song cover" />
    </SongCardContainer>
  );
};

export const SongRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px 20px;
  transition: background 0.2s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;
`;

export const OptionsButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const OptionsMenu = styled.div`
  position: absolute;
  right: 20px;
  top: 50px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 120px;
  z-index: 10;
  backdrop-filter: blur(6px);

  button {
    background: transparent;
    border: none;
    color: white;
    padding: 10px;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &:first-of-type {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
