// components/ui/PopupModal.tsx

import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
  height?: string;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div<{ width?: string; height?: string }>`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 16px;
  width: ${({ width }) => width || "400px"};
  height: ${({ height }) => height || "auto"};
  max-height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width,
  height,
}) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalWrapper
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <ModalHeader>
            {title}
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
        )}
        {children}
      </ModalWrapper>
    </Overlay>
  );
};

export default PopupModal;
