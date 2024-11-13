"use client";

import DeleteTransactionDialog from "@/app/_components/delete-transaction-dialog";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export default function DeleteTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => setDialogIsOpen(true)}
      >
        <Trash2Icon></Trash2Icon>
      </Button>
      <DeleteTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transactionId={transaction?.id}
      />
    </>
  );
}
