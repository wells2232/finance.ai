import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { getYear } from "date-fns";
import {
  TotalExpensesPerCategory,
  TransactionPercentagePerType,
} from "./types";

export default async function getDashboard(month: string) {
  const where = {
    date: {
      gte: new Date(`${getYear(new Date())}-${month}-01`),
      lt: new Date(`${getYear(new Date())}-${month}-31`),
    },
  };

  const totalDeposit = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.DEPOSIT },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const totalInvestment = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.INVESTIMENT },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const totalExpense = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: TransactionType.EXPENSE },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const balance = totalDeposit - totalExpense - totalInvestment;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentages: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(totalDeposit || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(totalExpense || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTIMENT]: Math.round(
      (Number(totalInvestment || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensesPerCategory: TotalExpensesPerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: { ...where, type: TransactionType.EXPENSE },
      _sum: { amount: true },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(totalExpense)) * 100,
    ),
  }));

  {
    /*JSON.strinfy*/
  }
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 11,
  });

  return {
    totalDeposit,
    totalInvestment,
    totalExpense,
    balance,
    typesPercentages,
    totalExpensesPerCategory,
    lastTransactions,
  };
}
