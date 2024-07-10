import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import config from "../config";
import { useModal } from "./ModalContext";

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  project_id: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  user_id: number;
  issues: Issue[] | null;
}

interface ProjectContextProps {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  projects: Project[] | null;
  setProjects: (projects: Project[] | null) => void;
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
  const [projects, setProjects] = useState<Project[] | null>(null);
  const { state } = useAuth();
  const { modals } = useModal();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (state?.user?.user_id && state?.token) {
          const apiUrl = `${config.apiUrl}/api/projects`;
          const response = await fetch(
            `${apiUrl}?user_id=${state.user.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch projects");
          }

          const fetchedProjects = await response.json();
          setProjects(fetchedProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [state, modals]);

  return (
    <ProjectContext.Provider
      value={{ selectedProjectId, setSelectedProjectId, projects, setProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
