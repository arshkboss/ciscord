import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const initialProfile = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  console.log(user);
  if (!user) {
    return redirect("/api/auth/login/");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.given_name} ${user.family_name}`,
      imgUrl: user.picture || "",
      email: user.email || "",
    },
  });
};
