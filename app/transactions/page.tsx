import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

export default async function TransactionsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransactions = await canUserAddTransaction();

  return (
    <>
      <NavBar />

      <div className="space-y-6 overflow-hidden p-6">
        {/*TITULO e BOTÂO*/}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanAddTransactions={userCanAddTransactions}
          />
        </div>
        <ScrollArea className="overflow-hidden">
          <DataTable
            columns={transactionsColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          ></DataTable>
        </ScrollArea>
      </div>
    </>
  );
}
