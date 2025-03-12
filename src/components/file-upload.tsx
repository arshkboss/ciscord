"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

import { X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="size-20 relative">
        <Image
          fill
          src={value}
          alt={value}
          className="rounded-full border shadow-md"
          unoptimized
        />
        <button
          onClick={() => onChange("")}
          className=" bg-red-400 absolute top-0 right-0 rounded-full p-1 shadow-md hover:bg-red-500 duration-100 "
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
        console.log("upload hogaya", res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(`Error occoured`, error);
      }}
    />
  );
};
