import { Transaction, TransactionType } from "@prisma/client";
import { Badge, CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export default function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-1 fill-primary" size={10} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-1 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTIMENT) {
    return (
      <Badge className="bg-muted font-bold text-white hover:bg-muted">
        <CircleIcon className="mr-1 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
}
