import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import { db } from "../_lib/prisma";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="px-6 py-8">
        <SummaryCards transactions={transactions} />
      </div>
    </div>
  );
}
