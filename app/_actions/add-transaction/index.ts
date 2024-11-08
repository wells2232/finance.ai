"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export async function addTransaction(params: AddTransactionParams) {
  // Validate the input
  addTransactionSchema.parse(params);

  // Get the user ID from the session
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  // Create the transaction
  await db.transaction.create({
    data: { ...params, userId },
  });

  // Revalidate the transactions page
  revalidatePath("/transactions");
}
