"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


const InviteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "invite";



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
        <div className="p-6"><Label className="uppercase font-semibold text-primary">Server Invition Link</Label>
        <div className="pt-4"><Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus:bg-accent/50 transition-all focus-visible:ring-offset-0 "/></div>
        
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
