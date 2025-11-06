import styled from "@emotion/styled";

export const Text = styled.h2`
  font-size: 22px;
  text-align: center;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 250px;
  background: rgba(0, 0, 0, 1);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const LoadingText = styled.div`
  padding: 8px 12px;
  color: #aaa;
`;

export const EmptyText = styled.div`
  padding: 8px 12px;
  color: #777;
`;
