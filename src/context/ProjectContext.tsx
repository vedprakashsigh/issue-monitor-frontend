import React, { createContext, ReactNode, useContext, useState } from "react";

interface ProjectContextProps {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  return (
    <ProjectContext.Provider
      value={{ selectedProjectId, setSelectedProjectId }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
