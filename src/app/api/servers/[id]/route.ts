import currentProfile from "@/utils/currentprofile";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const server = await params;
  const profile = await currentProfile();
  const { name, imageUrl } = await req.json();
  try {
    if (!profile) {
      console.log("Unauthorized");
      return new NextResponse("Internal server Error", { status: 401 });
    }

    const checkServer = await prisma.server.findUnique({
      where: {
        id: server?.id,
      },
    });
    if (!checkServer) {
      console.log("No server with that ID found.");
      return new NextResponse("Internal server Error", { status: 404 });
    }
    const editServer = await prisma.server.update({
      where: {
        id: server?.id,
        profileId: profile?.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return new NextResponse("Updated server details", { status: 200 });
  } catch (error) {
    console.log("[SERVER_ID_PATCH_PROCESS_ERROR]", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const server = await params;
  const profile = await currentProfile();

  try {
    if (!profile) {
      console.log("Unauthorized");
      return new NextResponse("Internal server Error", { status: 401 });
    }

    const checkServer = await prisma.server.findUnique({
      where: {
        id: server?.id,
      },
    });
    if (!checkServer) {
      console.log("No server with that ID found(Delete request).");
      return new NextResponse("Internal server Error", { status: 404 });
    }
    const deleteServer = await prisma.server.delete({
      where: {
        id: server?.id,
        profileId: profile?.id,
      },
    });
    return new NextResponse(`Deleted server ${deleteServer}`, { status: 200 });
  } catch (error) {
    console.log("[SERVER_ID_PATCH_PROCESS_ERROR]", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
