import { User } from "./user";

export type AuthContextType = {
  user: User | null;
  signIn: (payload: any) => Promise<void>;
  signUp: (payload: any) => Promise<void>;
  signOut: () => Promise<void>;
};
