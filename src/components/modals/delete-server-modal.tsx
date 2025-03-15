"use client";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

// Define the form schema
const formSchema = z.object({
  confirmText: z.string(),
});

// Define the form data type
type FormData = {
  confirmText: string;
};

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmText: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormData) => {
    try {
      // Only proceed if the confirmation text matches
      if (values.confirmText !== "CONFIRM") {
        toast.error("Please type 'CONFIRM' to delete the server");
        return;
      }

      const response = await axios.put(`/api/servers/${server?.id}`);

      if (response.status === 200) {
        form.reset();
        router.refresh();
        router.push("/");
        onClose();
        toast.success("Server deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete server");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            This action cannot be undone. This will permanently delete the
            server{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="confirmText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                    { ` Type 'CONFIRM' to delete`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Type 'CONFIRM'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <Button
                  disabled={isLoading}
                  onClick={handleClose}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} variant="primary" type="submit">
                  Confirm Delete
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
