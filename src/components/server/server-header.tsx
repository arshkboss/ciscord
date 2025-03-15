"use client";
import { MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfile } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { ChevronDown, PlusCircle, Settings, Trash, User, UserPlus } from "lucide-react";
interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}

//Main functin
const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div className="w-full">
      <DropdownMenu >
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button
            className="w-full text-sm font-semibold px-3 flex items-center 
          h-10 border-b-1  hover:bg-zinc-700/10 transition text-primary"
          >
            {server.name}
            <ChevronDown className="size-4 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-xs w-56 font-medium  rounded-none focus:outline-0 focus:ring-0 border-0 m-0 p-0 ">
          {isModerator && (
            <DropdownMenuItem className="text-indigo-600  py-2 text-sm flex justify-between  rounded-none m-0 ">
              Invite People
              <UserPlus />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className=" py-2 text-sm flex justify-between  rounded-none m-0 ">
              Server Settings
              <Settings />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem className=" py-2 text-sm flex justify-between  rounded-none m-0 ">
              Manage Members
              <User />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className=" py-2 text-sm flex justify-between  rounded-none m-0 ">
              Create Channels
              <PlusCircle />
            </DropdownMenuItem>
          )}
          {isModerator && (
            
              <DropdownMenuSeparator />
            
          )}
          {isAdmin && (
            <DropdownMenuItem className=" py-2 text-sm flex justify-between  rounded-none m-0 text-red-600 hover:text-red-500 hover:bg-red-100 transition ">
              Delete Server
              <Trash className="text-red-500"/>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* {server.members.map((m) => (
        <p key={m.profileId}>{m.Profile.userId})</p>
      ))} */}
    </div>
  );
};

export default ServerHeader;
