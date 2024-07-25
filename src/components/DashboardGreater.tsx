"use client";
import useAppContext from "@/hooks/useAppContext";
import DashboardTitle from "./DashboardTitle";

const DashboardGreater = () => {
  const { user } = useAppContext();

  const userNickname = user.username.split(" ")[0];

  return <DashboardTitle>Welcome {userNickname} !!</DashboardTitle>;
};

export default DashboardGreater;
