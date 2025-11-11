import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: sticky;
  top: 20px;

  padding: 1.5rem;
  width: 300px;
  height: 600px;

  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(50px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  border: 1px solid rgba(255, 255, 255, 0.3);

  z-index: 10;
`;

export const Menu = styled.p`
  margin: 2rem 0;
`;

interface PlaylistCardProps {
  name: string;
  songCount: number;
  coverImage?: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  name,
  songCount,
  coverImage,
}) => {
  return (
    <Card>
      <ImageContainer>
        <img src={coverImage || "/src/assets/default-cover.jpg"} alt={name} />
        <FadeMask />
        <CardInfo>
          <h3>{name}</h3>
          <p>{songCount} songs</p>
        </CardInfo>
      </ImageContainer>
    </Card>
  );
};

export default PlaylistCard;

const Card = styled.div`
  position: relative;
  width: 220px;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const FadeMask = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  border-radius: 0 0 16px 16px;
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 12px;
  color: white;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
  }
`;

export const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-height: 100vh;
  overflow-y: auto;
  padding: 20px;
`;
