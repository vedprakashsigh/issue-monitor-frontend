import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../utils/authUtils";
import { useAuth } from "../context/AuthContext";
import { ModalProvider } from "../context/ModalContext";
import { ProjectProvider } from "../context/ProjectContext"; // Added ProjectProvider

import Header from "./Header";
import MainSection from "./MainSection";
import Sidebar from "./SideBar";
import Footer from "./Footer";

import ProjectModal from "./modals/ProjectModal";
import IssueModal from "./modals/IssueModal";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

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
        <Flex direction='column' h='100vh' bg='gray.50' overflow='hidden'>
          <Header />
          <Flex direction='row' flex='1' overflow='hidden'>
            <Sidebar />
            <Box w='80%' p='4' overflow='auto'>
              <MainSection />
            </Box>
          </Flex>
          <Footer />
          <ProjectModal />
          <IssueModal />
        </Flex>
      </ModalProvider>
    </ProjectProvider>
  );
};
export default DashboardPage;
