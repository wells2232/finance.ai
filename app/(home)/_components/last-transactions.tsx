import { Button } from "@/app/_components/ui/button";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transaction } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatCurrencyBRL } from "@/app/_utils/currency";
import { TRANSACTIONS_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

export default function LastTransactions({
  lastTransactions,
}: LastTransactionsProps) {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "DEPOSIT") {
      return "text-primary";
    }
    if (transaction.type === "EXPENSE") {
      return "text-danger";
    }
    return "text-white";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant={"outline"} className="rounded-full font-bold" asChild>
          <Link href={"/transactions"}>Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTIONS_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="Payment Method"
                />
              </div>

              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {`${transaction.type === "DEPOSIT" ? "+" : "-"} `}
              {formatCurrencyBRL(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
