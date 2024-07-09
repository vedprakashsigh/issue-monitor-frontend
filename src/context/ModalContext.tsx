// ModalContext.tsx

import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextProps {
  modals: Record<string, boolean>;
  openModal: (modalName: string, projectId?: number, issueId?: number) => void; // Updated openModal function
  closeModal: (modalName: string) => void;
  projectId: number | null; // Add projectId to ModalContextProps
  issueId: number | null; // Add projectId to ModalContextProps
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
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const [projectId, setProjectId] = useState<number | null>(null); // State for projectId
  const [issueId, setIssueId] = useState<number | null>(null); // State for projectId

  const openModal = (
    modalName: string,
    projectId?: number,
    issueId?: number
  ) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
    if (projectId !== undefined) {
      setProjectId(projectId);
    }
    if (issueId !== undefined) {
      setIssueId(issueId);
    }
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
    setProjectId(null);
    setIssueId(null);
  };

  const modalContextValue: ModalContextProps = {
    modals,
    openModal,
    closeModal,
    projectId,
    issueId,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
