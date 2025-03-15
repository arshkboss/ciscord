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

  if (!profile) {
    return redirect("/api/login");
  }
  if (!inviteCode) {
    return redirect("/");
  }
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

  if (existingServer) {
    console.log("You are already a member of this server");
    console.log("Redirecting to", existingServer.name);
    return redirect(`/servers/${existingServer.id}`);
  }
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

  return <div>InviteCodePage {inviteCode}</div>;
};

export default InviteCodePage;
