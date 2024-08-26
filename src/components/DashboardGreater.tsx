"use client";
import useAppContext from "@/hooks/useAppContext";
import DashboardTitle from "./DashboardTitle";
import useClientComponent from "@/hooks/useClientComponent";

const DashboardGreater = () => {
  const { user } = useAppContext();
  const isClient = useClientComponent();

  const userNickname = user.username.split(" ")[0];

  return isClient && <DashboardTitle>Welcome {userNickname} !!</DashboardTitle>;
};

export default DashboardGreater;
