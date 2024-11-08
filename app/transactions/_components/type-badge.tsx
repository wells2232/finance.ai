import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import { Badge } from "../../_components/ui/badge";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export default function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-primary/15 font-bold text-primary hover:bg-primary/25">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-danger/25">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTIMENT) {
    return (
      <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-white/25">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
}
