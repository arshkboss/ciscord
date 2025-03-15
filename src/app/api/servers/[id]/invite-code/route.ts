import currentProfile from "@/utils/currentprofile";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const param = await params;

  try {
    const profile = await currentProfile();
    if (!currentProfile) {
      return new NextResponse("Not Authenticated", { status: 401 });
    }
    if (!param.id) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: param.id,
        profileId: profile?.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
