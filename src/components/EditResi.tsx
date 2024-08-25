"use client";
import editResiAction from "@/actions/editResiAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toast } from "./ui/use-toast";

export default function EditResi({ orderId }: { orderId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmitResiAction = async (formData: FormData) => {
    setLoading(true);
    try {
      const resi = formData.get("resi") as string;
      const response = await editResiAction(orderId, resi);

      if (response.status === "success") {
        toast({ description: "Resi updated successfully." });
      } else {
        toast({ description: response.message, variant: "destructive" });
      }
    } catch (error) {
      toast({
        description: "An error occurred while updating the resi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Resi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Resi</DialogTitle>
          <DialogDescription>
            Edit resi anda disini. Klik simpan bila sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <form
          action={handleSubmitResiAction}
          ref={formRef}
          className="grid gap-4 py-4"
        >
          <div className="flex flex-col gap-4">
            <Label htmlFor="resi" className="text-left">
              Resi
            </Label>
            <Input id="resi" name="resi" className="col-span-3" required />
          </div>
        </form>
        <DialogFooter>
          <Button onClick={submitForm} disabled={loading} className="w-full">
            {loading ? "Menyimpan..." : "Simpan Resi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
