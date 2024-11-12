import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import getDashboard from "../_data/get-dashboard";
import Navbar from "../_components/navbar";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-reports-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

/**
 * The Home component is an asynchronous function that renders the dashboard page.
 * It performs user authentication, validates the month parameter, and fetches
 * necessary data for the dashboard.
 *
 * @param {HomeProps} props - The properties passed to the Home component.
 * @param {Object} props.searchParams - The search parameters from the URL.
 * @param {string} props.searchParams.month - The month parameter from the URL.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 *
 * @throws Will redirect to the login page if the user is not authenticated.
 * @throws Will redirect to the current month if the month parameter is invalid.
 */
export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);
  const userCanAddTransactions = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <AiReportButton hasPremiumPlan={hasPremiumPlan} month={month} />
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransactions={userCanAddTransactions}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensesPerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
}
