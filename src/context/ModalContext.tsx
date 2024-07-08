import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  modals: Record<string, boolean>;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
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

  const openModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  const modalContextValue: ModalContextProps = {
    modals,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
