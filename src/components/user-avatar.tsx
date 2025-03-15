import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { Button } from "./ui/button";

interface Member {
  id: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
  role: string; // Adjust to match $Enums.MemberRole
  serverId: string;
  Profile: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    userId: string;
    imgUrl: string;
  };
}

const UserAvatar = ({ data }: { data: Member }) => {
  return (
    <div className="flex bg-accent m-1 rounded-full items-center justify-between w-full">
      <div className="flex justify-between items-center p-1 ">
        <Avatar>
          <AvatarImage src={data.Profile.imgUrl} />
          <AvatarFallback className="bg-primary/10">
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="p-2 text-sm">{data.Profile.name}</div>
        <div className="p-2 text-sm flex items-center gap-x-2 ">
          {data.role === "ADMIN" && (
            <FaShieldAlt className="text-red-500 size-5 animate-pulse" />
          )}
        </div>
      </div>
      <Button className="h-7 mr-2 px-2">Kick</Button>
    </div>
  );
};

export default UserAvatar;
