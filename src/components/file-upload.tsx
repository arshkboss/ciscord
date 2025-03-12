"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { error } from "console";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
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
