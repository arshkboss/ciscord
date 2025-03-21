import React from "react";
import prisma from "@/utils/prisma";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { NavigationAction } from "./navigation-action";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

import { NavigationItems } from "./navigation-item";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ui/theme-toggle";
import Link from "next/link";

const NavigationSidebar = async () => {
  //get kinde server
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // First get the profile
  if (!user) {
    return redirect("/");
  }
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
    <div className="flex flex-col min-h-[100vh] h-full w-full bg-accent items-center py-2 space-y-2">
      <NavigationAction />
      <div className=" h-[2px] bg-primary rounded-md mx-auto w-10 ">
        <Separator />
      </div>

      <ScrollArea className="flex-1 w-full m-0 p-0">
        {serverData.map((server) => (
          <div
            key={server.id}
            className="items-center space-y-2 py-1 m-0 w-full"
          >
            <NavigationItems
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="bg-primary h-[2px]  rounded-md mx-auto w-10 ">
        <Separator />
      </div>
      <div className="pt-2  rounded-md mx-auto w-10 ">
        <ModeToggle />
      </div>
      <div className="mt-auto flex items-center flex-col rounded-full ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="flex m-3 h-[48px] w-[48px] rounded-[24px] 
                hover:rounded-[16px] transition-all overflow-hidden 
                items-center justify-center bg-primary/80
              hover:bg-emerald-500 "
              >
                <LogoutLink>
                  <IoIosLogOut className="size-6" />
                </LogoutLink>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={15}>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="flex  h-[48px] w-[48px] rounded-[24px] bg-primary/80
              hover:rounded-[16px] transition-all overflow-hidden 
              items-center justify-center 
            hover:bg-emerald-500 "
              >
                <Link href={`/profile/${profile?.id}`}>
                  <CiUser className="size-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={15}>
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default NavigationSidebar;
