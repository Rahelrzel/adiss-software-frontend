import styled from "@emotion/styled";

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 1rem;
`;

export const Toggle = styled.div<{ checked: boolean }>`
  width: 60px;
  height: 28px;
  border-radius: 50px;
  background: ${({ checked }) =>
    checked ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.2)"};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const ToggleCircle = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ checked }) => (checked ? "32px" : "3px")};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  transition: all 0.3s ease;
`;

export const Text = styled.p`
  color: white;
  font-size: 40px;
  text-align: center;
  padding: 10px;
  margin: 10px;
`;
