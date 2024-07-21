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
import Loader from "./Loader";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { selectedTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => {}, 10000);
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
    return <Loader />;
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
    </Flex>
  );
};

export default DashboardPage;
