import styled from "@emotion/styled";

export const SongCardContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
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
