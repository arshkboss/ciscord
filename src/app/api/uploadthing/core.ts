import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const f = createUploadthing();

const handleAuth = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user) throw new Error("U R Not Authorised!");
  return {
    user: user,
  };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileCount: 1, maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
