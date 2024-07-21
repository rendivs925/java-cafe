"use client";
import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import useAppContext from "@/hooks/useAppContext";

export interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
  const { moveRoute } = useAppContext();

  useEffect(() => {
    const logout = async () => {
      try {
        const data = await axios.delete("/api/auth/logout", {});
        alert(data);
        moveRoute("/");
      } catch (e) {
        const error = e as AxiosError;
        alert(`Logout failed: ${error.message}`);
      }
    };

    logout();
  }, []);

  return null;
};

export default Logout;
