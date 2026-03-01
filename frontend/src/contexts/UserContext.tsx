import React, {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
} from "react";
import type Todo from "../types/Todo";

interface User {
  id: number;
  username: string;
  password: string;
  isLoggedIn: boolean;
  todos: Todo[];
}

type UserActions =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "REGISTER"; payload: User };

const initialState: User = {
  id: 0,
  username: "",
  password: "",
  isLoggedIn: false,
  todos: [],
};

const userReducer = (state: User, action: UserActions): User => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload, isLoggedIn: true };
    case "LOGOUT":
      return { ...initialState };
    case "REGISTER":
      return { ...action.payload, isLoggedIn: true };
    default:
      return state;
  }
};

interface UserContextType {
  state: User;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (user: User) => dispatch({ type: "LOGIN", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });
  const register = (user: User) =>
    dispatch({ type: "REGISTER", payload: user });

  return (
    <UserContext.Provider value={{ state, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
