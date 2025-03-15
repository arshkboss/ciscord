"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
    toast("✅ Copped Invite Link!");
  };

  const onNew = async () => {
    try {
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-2xl text-center font-medium">
            Invite your friends!
            <DialogDescription className="pt-5">
              Generate and send an Invite code to let others join the server!
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs uppercase font-semibold tracking-wide text-primary ">
            Server Invition Link
          </Label>
          <div className="pt-4 flex ">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/20 border-0 focus-visible:ring-0 focus:bg-accent/80 transition-all focus-visible:ring-offset-0 mr-2"
              value={inviteUrl}
              readOnly
            />
            {/*    copybutton  */}
            <Button disabled={isLoading} size={"icon"} onClick={onCopy}>
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
          {/*    generatenewlink button  */}
          <Button className="mt-4 group" disabled={isLoading} onClick={onNew}>
            Generate a new link
            <span className="group-hover:animate-spin">
              <RefreshCw className="size-4" />
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
