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
    <div className="flex flex-col min-h-[100vh] w-[60px] bg-black/80 px-2 items-center justify-between py-4">
      <Button className="size-10 " title="Create new server">
        <IoIosAdd className="size-6" />
      </Button>

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
                      height={50}
                      width={50}
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

      {
        <Button asChild className="size-10" title="Logout">
          <LogoutLink>
            <IoIosLogOut className="size-6" />
          </LogoutLink>
        </Button>
      }
    </div>
  );
};

export default Sidebar;
