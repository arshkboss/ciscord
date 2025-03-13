import React from "react";
import prisma from "@/utils/prisma";
import Image from "next/image";
const ServerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);

  const getServerDetails = await prisma.server.findUnique({
    where: {
      id: id,
    },
  });
  console.log(typeof getServerDetails);
  return (
    <div>
      {
        <div className="flex flex-col">
          <p>{`Server Created at: ${getServerDetails?.createdAt.toDateString()}`}</p>
          <p>
            {
              <Image
                src={getServerDetails?.imageUrl || ""}
                alt={getServerDetails?.imageUrl || ""}
                height={100}
                width={100}
                unoptimized
              ></Image>
            }
          </p>
          <p>{`Server Name: ${getServerDetails?.name.toUpperCase()}`}</p>
          <p>{`Invite Code: ${getServerDetails?.inviteCode}`}</p>
          <p>{`Members: ${getServerDetails?.id}`}</p>
        </div>
      }
    </div>
  );
};

export default ServerPage;
