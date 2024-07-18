import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getCurrentUser } from "../utils/authUtils";

import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import config from "../config";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const toast = useToast();
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [state.token]);

  const handleChangeRole = async () => {
    if (!selectedUserId || !selectedRole) {
      toast({
        title: "Error",
        description: "Please select a user and role",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await fetch(`${config.apiUrl}/api/admin/change_role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({
          user_id: selectedUserId,
          role: selectedRole,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to change user role");
      }
      const updatedUser = users.filter((user) => user.id === selectedUserId)[0];
      if (updatedUser) {
        updatedUser.role = selectedRole;
        setUsers([...users]);
      }

      toast({
        title: "Role updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedUserId(null);
      setSelectedRole("");
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: "Failed to update role",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (state.user?.role !== "admin") {
    return <div>You are not authorized to access this page.</div>;
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
          <Box
            p={4}
            bg={selectedTheme.colors.modalBg}
            color={selectedTheme.colors.modalContent}
            my='auto'
            mx='4'
            display={{ base: !showSidebar ? "block" : "none", md: "block" }}
          >
            <Text fontSize='xl' fontWeight='bold' mb={4}>
              Admin Dashboard
            </Text>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Select User</FormLabel>
                <Select
                  value={selectedUserId || ""}
                  onChange={(e) => setSelectedUserId(Number(e.target.value))}
                  placeholder='Select User'
                  bg={selectedTheme.colors.inputBg}
                  color={selectedTheme.colors.inputText}
                >
                  {users.map((user) => {
                    if (user.id !== state.user?.user_id)
                      return (
                        <option
                          key={user.id}
                          value={user.id}
                          color={selectedTheme.colors.option}
                          style={{
                            backgroundColor: selectedTheme.colors.option,
                          }}
                        >
                          {user.name} - {user.email}
                        </option>
                      );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Select Role</FormLabel>
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  placeholder='Select Role'
                  bg={selectedTheme.colors.inputBg}
                  color={selectedTheme.colors.inputText}
                >
                  <option
                    value='admin'
                    color={selectedTheme.colors.option}
                    style={{ backgroundColor: selectedTheme.colors.option }}
                  >
                    Admin
                  </option>
                  <option
                    value='project_manager'
                    color={selectedTheme.colors.option}
                    style={{ backgroundColor: selectedTheme.colors.option }}
                  >
                    Project Manager
                  </option>
                  <option
                    value='member'
                    color={selectedTheme.colors.option}
                    style={{ backgroundColor: selectedTheme.colors.option }}
                  >
                    Member
                  </option>
                </Select>
              </FormControl>
              <Button
                onClick={handleChangeRole}
                variant='outline'
                _hover={{ bg: selectedTheme.colors.buttonSecondary }}
                color={selectedTheme.colors.buttonPrimary}
                disabled={!selectedUserId || !selectedRole}
              >
                Change Role
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default AdminDashboard;
