import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionsColumns } from "./_columns";

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});
  return (
    <div>
      {/*TITULO e BOTÂO*/}
      <div className="flex h-full items-center justify-between p-6 pr-8">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <div className="px-8">
        <DataTable
          columns={transactionsColumns}
          data={transactions}
        ></DataTable>
      </div>
    </div>
  );
}
