import config from "../config";

export const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const setToken = (token: string): void => {
  sessionStorage.setItem("token", token);
};

export const removeToken = (): void => {
  sessionStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<{
  username: string;
  user_id: number;
  role: string;
} | null> => {
  const token = getToken();
  if (!token) return null;

  const apiUrl = config.apiUrl;
  const response = await fetch(`${apiUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return {
      username: data["logged_in_as"]["username"],
      user_id: data["user_id"],
      role: data["role"],
    };
  }
  return null;
};

export const logout = () => {
  removeToken();
};
