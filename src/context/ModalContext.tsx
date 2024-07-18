import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalContextProps {
  modals: Record<string, boolean>;
  openModal: (
    modalName: string,
    projectId?: number,
    issueId?: number,
    commentId?: number
  ) => void; // Updated openModal function
  closeModal: (modalName: string) => void;
  projectId: number | null; // Add projectId to ModalContextProps
  issueId: number | null; // Add projectId to ModalContextProps
  commentId: number | null; // Add projectId to ModalContextProps
  forceUpdate: () => void;
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
  const [issueId, setIssueId] = useState<number | null>(null); // State for issueId
  const [commentId, setCommentId] = useState<number | null>(null); // State for commentId
  const [modalUpdateTrigger, setModalUpdateTrigger] = useState(false);
  const forceUpdate = () => {
    setModalUpdateTrigger(!modalUpdateTrigger);
  };

  useEffect(() => {
    const update = () => {
      setModals({ ...modals });
    };
    setTimeout(() => update(), 100);
  }, [modalUpdateTrigger]);

  const openModal = (
    modalName: string,
    projectId?: number,
    issueId?: number,
    commentId?: number
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
    if (commentId !== undefined) {
      setCommentId(commentId);
    }
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
    setProjectId(null);
    setIssueId(null);
    setCommentId(null);
  };

  const modalContextValue: ModalContextProps = {
    modals,
    openModal,
    closeModal,
    projectId,
    issueId,
    commentId,
    forceUpdate,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
