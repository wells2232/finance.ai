"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface DeleteTransactionParams {
  transactionId?: string;
}

/**
 * Deletes a transaction from the database.
 *
 * @param {DeleteTransactionParams} params - The parameters to delete a transaction.
 * @param {string} params.transactionId - The ID of the transaction to delete.
 *
 * @throws Will throw an error if the user is not authenticated.
 */

export async function DeleteTransaction({
  transactionId,
}: DeleteTransactionParams) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
}
