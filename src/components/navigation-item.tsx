"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "./action-tooltip";
import Link from "next/link";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}
export const NavigationItems = ({
  id,
  imageUrl,
  name,
}: NavigationItemProps) => {
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div>
        <Link href={`/servers/${id}`}>
          <Image
            src={imageUrl}
            alt={name}
            height={45}
            width={45}
            unoptimized
            className="rounded-xl hover:shadow-2xl"
          />
        </Link>
      </div>
    </ActionTooltip>
  );
};
