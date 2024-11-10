"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PercentageItem } from "./percentage-items";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "green",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
  [TransactionType.INVESTIMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentages: TransactionPercentagePerType;
  totalDeposit: number;
  totalInvestment: number;
  totalExpense: number;
}

export default function TransactionsPieChart({
  totalDeposit,
  totalInvestment,
  totalExpense,
  typesPercentages,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: totalDeposit,
      fill: chartConfig[TransactionType.DEPOSIT].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: totalExpense,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
    {
      type: TransactionType.INVESTIMENT,
      amount: totalInvestment,
      fill: chartConfig[TransactionType.INVESTIMENT].color,
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={75}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon className="text-primary" />}
            title="Receita"
            value={typesPercentages[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon className="text-danger" />}
            title="Despesas"
            value={typesPercentages[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon />}
            title="Investido"
            value={typesPercentages[TransactionType.INVESTIMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
