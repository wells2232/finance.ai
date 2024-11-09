import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

function getClassNames(title: string): string {
  const classNames = [];
  if (title === "Investido") classNames.push("rounded-md bg-white/10 p-1");
  if (title === "Receita") classNames.push("rounded-md bg-primary/25 p-1");
  if (title === "Despesas")
    classNames.push("rounded-md bg-danger bg-opacity-20 p-1");
  return classNames.join(" ");
}

export default function SummaryCard({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) {
  return (
    <>
      <Card
        className={`${size === "large" ? "bg-darkgreen" : "bg-transparent"} ${title === "Investido" ? "bg-darkgray" : ""}`}
      >
        <CardHeader className="flex-row items-center">
          <div className="flex items-center gap-2">
            <div className={getClassNames(title)}>{icon}</div>
            <p
              className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
            >
              {title}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`font-bold ${size === "small" ? "text-2xl" : "text text-4xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>

          {size === "large" && <AddTransactionButton />}
        </CardContent>
      </Card>
    </>
  );
}
