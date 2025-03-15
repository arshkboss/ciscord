"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
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
  const params = useParams();

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <Link href={`/servers/${id}`}>
        <div className="group relative flex items-center">
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              params?.id !== id && "group-hover:h-[20px]",
              params?.id === id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.id === id && "rounded-[16px] bg-primary/10"
            )}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </Link>
    </ActionTooltip>
  );
};
