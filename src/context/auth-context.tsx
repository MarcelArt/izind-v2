import { createContext, useContext, type FC, type ReactNode } from 'react';

export interface AuthContextProps {
  userId: string;
  username: string;
}

const AuthContext = createContext<AuthContextProps>({
  userId: '',
  username: '',
});

interface AuthContextProviderProps {
  children: ReactNode;
  userId: string;
  username: string;
}

export const AuthProvider: FC<AuthContextProviderProps> = ({ children, userId, username }) => {
  let value: AuthContextProps = {
    userId,
    username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
}