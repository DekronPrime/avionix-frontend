"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../lib/api/axios";
import { useLoader } from "./LoaderContext";
import { User } from "../types/user";
import { AuthContextType } from "../types/authContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setLoading } = useLoader();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const saveTokenClientSide = (token: string) => {
    Cookies.set("jwt", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const signIn = async (payload: any) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", payload);
      const data = res.data;

      if (data.token) saveTokenClientSide(data.token);
      setUser(data.user);
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload: any) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", payload);
      const data = res.data;

      if (data.token) saveTokenClientSide(data.token);
      setUser(data.user);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    Cookies.remove("jwt");
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
