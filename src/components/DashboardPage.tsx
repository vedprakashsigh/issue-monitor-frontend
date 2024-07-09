import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ModalProvider } from "../context/ModalContext";
import { ProjectProvider } from "../context/ProjectContext";
import { useTheme } from "../context/ThemeContext";
import { getCurrentUser } from "../utils/authUtils";

import Footer from "./Footer";
import Header from "./Header";
import MainSection from "./MainSection";
import Sidebar from "./SideBar";

import AddIssueModal from "./modals/AddIssueModal";
import AddProjectModal from "./modals/AddProjectModal";
import EditIssueModal from "./modals/EditIssueModal";
import EditProjectModal from "./modals/EditProjectModal";
import DeleteModal from "./modals/DeleteModal";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { selectedTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: { user, token: state.token as string },
        });
      } else {
        navigate("/login");
      }
      setLoading(false);
    };
    fetchUser();
  }, [dispatch, navigate, state.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectProvider>
      <ModalProvider>
        <Flex
          direction='column'
          h='100vh'
          bg={selectedTheme.colors.background}
          overflow='hidden'
        >
          <Header />
          <Flex direction='row' flex='1' overflow='hidden'>
            <Sidebar />
            <Box w='80%' p='4' overflow='auto'>
              <MainSection />
            </Box>
          </Flex>
          <Footer />
          <AddProjectModal />
          <AddIssueModal />
          <EditProjectModal />
          <EditIssueModal />
          <DeleteModal />
        </Flex>
      </ModalProvider>
    </ProjectProvider>
  );
};

export default DashboardPage;
