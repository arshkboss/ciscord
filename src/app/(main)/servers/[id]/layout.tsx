import { redirect } from "next/navigation";
import prisma from "@/utils/prisma";
import currentProfile from "@/utils/currentprofile";
import ServerSidebar from "@/components/server/server-sidebar";
const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/api/auth/login/");
  }
  const param = await params;
  const server = prisma.server.findUnique({
    where: {
      id: param.id,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-60 z-20 flex-col 
      fixed inset-y-0 "
      >
        <ServerSidebar serverId={param.id} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};
export default ServerIdLayout;
