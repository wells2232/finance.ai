import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

function getClassNames(title: string): string {
  const classNames = [];
  if (title === "Investido") classNames.push("rounded-md bg-white/10 p-1");
  if (title === "Receita") classNames.push("rounded-md bg-primary/25 p-1");
  if (title === "Despesas")
    classNames.push("rounded-md bg-danger bg-opacity-20 p-1");
  return classNames.join(" ");
}

export function PercentageItem({ icon, title, value }: PercentageItemProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={getClassNames(title)}>{icon}</div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <p className="text-sm font-bold">{value}%</p>
      </div>
    </>
  );
}
