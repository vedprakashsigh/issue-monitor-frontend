import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  isProjectModalOpen: boolean;
  isIssueModalOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  openIssueModal: () => void;
  closeIssueModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);
  const openIssueModal = () => setIsIssueModalOpen(true);
  const closeIssueModal = () => setIsIssueModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isProjectModalOpen,
        isIssueModalOpen,
        openProjectModal,
        closeProjectModal,
        openIssueModal,
        closeIssueModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
