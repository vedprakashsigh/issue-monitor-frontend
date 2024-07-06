export const getCurrentUser = (): { username: string } | null => {
  const userString = localStorage.getItem("currentUser");
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
};

export const setCurrentUser = (user: { username: string }): void => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem("currentUser");
};
