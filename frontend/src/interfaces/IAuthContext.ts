import { IUser } from './IUser';

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
}
