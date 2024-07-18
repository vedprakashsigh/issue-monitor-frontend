import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
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
import AddUserModal from "./modals/AddUserModal";
import AddCommentModal from "./modals/AddCommentModal";
import EditCommentModal from "./modals/EditCommentModal";
import CommentsModal from "./modals/CommentModal";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
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
    <Flex
      direction='column'
      h='100vh'
      bg={selectedTheme.colors.background}
      overflow='hidden'
      w='100vw'
    >
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Flex
        direction={{ base: "column", md: "row" }}
        flex='1'
        overflow='hidden'
      >
        <Sidebar showSidebar={showSidebar} />
        <Box
          w={{ base: "100%", md: "80%" }}
          p={{ base: "2", md: "4" }}
          overflow='auto'
        >
          <MainSection showSidebar={showSidebar} />
        </Box>
      </Flex>
      <Footer />
      <AddProjectModal />
      <AddCommentModal />
      <AddIssueModal />
      <AddUserModal />
      <CommentsModal />
      <DeleteModal />
      <EditProjectModal />
      <EditCommentModal />
      <EditIssueModal />
    </Flex>
  );
};

export default DashboardPage;
