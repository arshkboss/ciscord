import currentProfile from "@/utils/currentprofile";
import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
const InviteCodePage = async ({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) => {
  const { inviteCode } = await params;
  const profile = await currentProfile();
  //check login
  if (!profile) {
    return redirect("/api/auth/login");
  }
  //check invite code from param
  if (!inviteCode) {
    return redirect("/");
  }

  //check if a server has such a invite code
  const inviteCodeValid = await prisma.server.findFirst({
    where: {
      inviteCode: inviteCode,
    },
  });
  if (!inviteCodeValid) {
    console.log("No server has this invite code");
    return redirect("/");
  }
  //check if a server has such a invite code
  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  //if already a memeber redirect to server
  if (existingServer) {
    console.log("You are already a member of this server");
    console.log("Redirecting to", existingServer.name);
    return redirect(`/servers/${existingServer.id}`);
  }

  //if not a member join the server
  const server = await prisma.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });
  //redirect to newly added server
  if (server) {
    console.log("Joined server", server.name);
    console.log("Redirecting to", server.name);
    return redirect(`/servers/${server.id}`);
  }
};

export default InviteCodePage;
