"use client";
import { MemberRole, Server } from "@prisma/client";
import { ServerWithMembersWithProfile } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, UserPlus } from "lucide-react";
interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole;

  return (
    <div className="w-full">
      <DropdownMenu classNa>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button
            className="w-full text-sm font-semibold px-3 flex items-center 
          h-10 border-b-2 border-accent-foreground hover:bg-zinc-700/10 transition "
          >
            {server.name}
            <ChevronDown className="size-4 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-xs w-56 font-medium  ">
          {isModerator && (
            <DropdownMenuItem className="text-indigo-600  py-2 text-sm flex justify-between ">
              Invite Peopel
              <UserPlus />
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
