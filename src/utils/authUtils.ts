import config from "../config";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<{
  username: string;
  user_id: number;
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
    };
  }
  return null;
};

export const logout = () => {
  removeToken();
};
