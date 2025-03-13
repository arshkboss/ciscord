import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { Button } from "./ui/button";
import { IoIosAdd, IoIosLogOut } from "react-icons/io";
import prisma from "@/utils/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // First get the profile
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  const serverData = profile
    ? await prisma.server.findMany({
        where: {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
      })
    : [];

  console.log("Profile:", profile);
  console.log("Server Data:", serverData);

  return (
    <div className="flex flex-col min-h-[100vh] w-[70px] bg-black/80 px-2 items-center justify-between py-4">
      <div className="items-center flex flex-col space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/"}>
                <Button className="size-11 ">
                  <IoIosAdd className="size-6" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={15}>
              <p>Create new Server</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div>
          {serverData.map((server) => (
            <div key={server.id} className="py-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/servers/${server.id}`}>
                      <Image
                        src={server.imageUrl}
                        alt={server.name}
                        height={45}
                        width={45}
                        unoptimized
                        className="rounded-xl hover:shadow-2xl"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={15}>
                    <p>{server.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </div>

      <div>
        {
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild className="size-11">
                  <LogoutLink>
                    <IoIosLogOut className="size-6" />
                  </LogoutLink>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={15}>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      </div>
    </div>
  );
};

export default Sidebar;
