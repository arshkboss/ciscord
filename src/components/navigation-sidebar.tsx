import React from "react";
import prisma from "@/utils/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NavigationAction } from "./navigation-action";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

import Link from "next/link";
import { NavigationItems } from "./navigation-item";

const NavigationSidebar = async () => {
  //get kinde server
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // First get the profile
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  //find all servers of logged in user
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
  //log the data
  console.log("Profile:", profile);
  console.log("Server Data:", serverData);

  return (
    <div
      className="flex flex-col min-h-[100vh] h-full w-full
     bg-black/80 px-2 items-center py-2 space-y-4"
    >
      <NavigationAction />

      <Separator className="h-[2px] bg-zinc-300 rounded-md mx-auto w-10 " />
      <ScrollArea className="flex-1 w-full" />
      {serverData.map((server) => (
        <div key={server.id} className="">
          <NavigationItems
            id={server.id}
            imageUrl={server.imageUrl}
            name={server.name}
          />
        </div>
      ))}
<div className="pb-3 mt-auto flex items-center flex-col gap-y-4"></div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default NavigationSidebar;
