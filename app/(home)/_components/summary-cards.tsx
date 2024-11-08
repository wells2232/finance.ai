import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Transaction, TransactionType } from "@prisma/client";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export default async function SummaryCards({
  transactions,
}: SummaryCardsProps) {
  // calcula o saldo total
  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return acc + transaction.amount.toNumber();
    } else {
      return acc - transaction.amount.toNumber();
    }
  }, 0);

  const totalInvested = transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.INVESTIMENT) {
      return acc + transaction.amount.toNumber();
    } else {
      return acc;
    }
  }, 0);

  const totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return acc + transaction.amount.toNumber();
    } else {
      return acc;
    }
  }, 0);

  const totalExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return acc + transaction.amount.toNumber();
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className="m-3 flex flex-col gap-6 px-6 py-8">
      <div className="flex items-center justify-between rounded-3xl border bg-darkgreen px-6 py-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <WalletIcon size={24} className="bg-black" />
            <h1>Saldo</h1>
          </div>
          <h1 className="text-4xl">{"R$ " + balance}</h1>
        </div>
        <div>
          <AddTransactionButton />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Card Investimento*/}
        <div className="flex flex-col gap-3 rounded-3xl border bg-darkgray p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/10 p-1">
              <PiggyBankIcon size={24} />
            </div>
            <h1>Investido</h1>
          </div>
          <h1 className="text-3xl">{"R$ " + totalInvested}</h1>
        </div>

        {/* Card Receita*/}
        <div className="flex flex-col gap-3 rounded-3xl border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/40 p-1">
              <TrendingUpIcon size={24} className="text-primary" />
            </div>
            <h1>Receita</h1>
          </div>
          <h1 className="text-2xl">{"R$ " + totalIncome}</h1>
        </div>

        {/* Card Despesa*/}
        <div className="flex flex-col gap-3 rounded-3xl border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-danger bg-opacity-40 p-1">
              <TrendingDownIcon size={24} className="text-danger" />
            </div>
            <h1>Despesas</h1>
          </div>
          <h1 className="text-2xl">{"R$ " + totalExpenses}</h1>
        </div>
      </div>
    </div>
  );
}
