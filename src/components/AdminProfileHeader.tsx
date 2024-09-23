"use client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useAppContext from "@/hooks/useAppContext";

const AdminProfileHeader: React.FC = () => {
  const { user } = useAppContext();
  const { username, imgUrl } = user;

  return (
    <div className="flex items-center justify-between space-x-6 bg-transparent rounded-lg">
      <span className="font-semibold text-muted-foreground">{username}</span>

      <Avatar className="w-10 h-10">
        <AvatarImage src={imgUrl} alt={`${username}'s profile picture`} />
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AdminProfileHeader;
