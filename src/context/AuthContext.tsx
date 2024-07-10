import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { getCurrentUser, getToken } from "../utils/authUtils";

export interface AuthState {
  user: { username: string; user_id: number } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: getToken(), // Initialize token from localStorage on app load
};

type AuthAction =
  | {
      type: "LOGIN";
      payload: { user: { username: string; user_id: number }; token: string };
    }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Effect to update user state on app load
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: { user, token: getToken() as string },
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
