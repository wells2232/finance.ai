import { Loader2Icon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DeleteTransaction } from "../_actions/delete-transaction";
import { useState } from "react";

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  transactionId: string;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DeleteTransactionDialog({
  isOpen,
  transactionId,
  setIsOpen,
}: DeleteTransactionDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      await DeleteTransaction({ transactionId });
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-danger">
              <XIcon className="text-black" size={16} />
            </div>
            <DialogTitle>Deseja deletar essa transação?</DialogTitle>
          </div>
          <DialogDescription>
            Uma vez deletada não poderá recuperá-la{" "}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2Icon className="animate-spin" />
                Deletando...
              </>
            ) : (
              "Deletar"
            )}
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
