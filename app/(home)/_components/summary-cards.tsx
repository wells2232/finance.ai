/*

import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Button } from "@/app/_components/ui/button";
import { Transaction, TransactionType } from "@prisma/client";
import {
  EyeIcon,
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
  // Formata o valor para BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

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

  // Trigger para mostrar e esconder o saldo
  function toggleBalance() {
    const balanceElement = document.getElementById("balance");
    if (balanceElement) {
      balanceElement.hidden = !balanceElement.hidden;
    }
  }

  return (
    <div className="m-3 flex flex-col gap-6 px-6 py-8">
      <div className="bg-darkgreen flex items-center justify-between rounded-3xl border px-6 py-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <WalletIcon size={24} className="bg-black" />
            <h1 className="text-white/20">Saldo</h1>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl" hidden={false} id="balance">
              {formatCurrency(balance)}
            </h1>
            <Button
              className="size-8 border-none bg-transparent"
              variant={"outline"}
              onClick={toggleBalance}
            >
              <EyeIcon size={24} className="text-white" />
            </Button>
          </div>
        </div>
        <div>
          <AddTransactionButton />
        </div>
      </div>

      <div className="flex gap-6">
        
        <div className="bg-darkgray flex flex-col gap-3 rounded-3xl border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-white/10 p-1">
              <PiggyBankIcon size={24} />
            </div>
            <h1 className="text-white/20">Investido</h1>
          </div>
          <h1 className="text-3xl">{formatCurrency(totalInvested)}</h1>
        </div>

        
        <div className="flex flex-col gap-3 rounded-3xl border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/25 p-1">
              <TrendingUpIcon size={24} className="text-primary" />
            </div>
            <h1 className="text-white/20">Receita</h1>
          </div>
          <h1 className="text-2xl">{formatCurrency(totalIncome)}</h1>
        </div>

        
        <div className="flex flex-col gap-3 rounded-3xl border p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-danger bg-opacity-25 p-1">
              <TrendingDownIcon size={24} className="text-danger" />
            </div>
            <h1 className="text-white/20">Despesas</h1>
          </div>
          <h1 className="text-2xl">{formatCurrency(totalExpenses)}</h1>
        </div>
      </div>
    </div>
  );
}
*/

import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  totalInvestment: number;
  totalDeposit: number;
  totalExpense: number;
}

export default async function SummaryCards({
  balance,
  totalDeposit,
  totalExpense,
  totalInvestment,
}: SummaryCards) {
  return (
    <div className="space-y-6">
      {/* CARD 1*/}
      <SummaryCard
        icon={<WalletIcon size={18} />}
        title={"Saldo"}
        amount={balance}
        size="large"
      />

      {/* OUTROS CARDS*/}
      <div className="grid grid-cols-3 gap-6">
        {/* CARD INVESTIDO */}
        <SummaryCard
          icon={
            <PiggyBankIcon size={16} className="rounded-sm border bg-muted" />
          }
          title={"Investido"}
          amount={totalInvestment}
        />

        {/* CARD RECEITA */}
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title={"Receita"}
          amount={totalDeposit}
        />

        {/* CARD DESPESAS */}
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-danger" />}
          title={"Despesas"}
          amount={totalExpense}
        />
      </div>
    </div>
  );
}
