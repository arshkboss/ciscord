import { initialProfile } from "@/utils/initial-profile";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/utils/prisma";
import InitialModal from "@/components/modals/initial-modal";
import { redirect } from "next/navigation";
// import { UploadButton } from "@/utils/uploadthing";

const SetupPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);
  const profile = await initialProfile();
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  console.log(server);
  if (server) {
    return redirect(`servers/${server.id}`);
  } else {
    console.log(`no server found`, server);
  }

  return (
    <>
      <div>
        Create a Server
        <LoginLink>Login</LoginLink>
        <LogoutLink>Logout</LogoutLink>
      </div>
      <div>
        <InitialModal />
      </div>
    </>
  );
};

export default SetupPage;
