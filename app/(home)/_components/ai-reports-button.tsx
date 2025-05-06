"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { FileTextIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-reports";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

export default function AiReportButton({
  month,
  hasPremiumPlan,
}: AiReportButtonProps) {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState<boolean>(false);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
console.log(aiReport):
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-sm font-bold" variant="outline">
          Relatório IA
          <FileTextIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-2-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>
                <FileTextIcon className="text-primary" />
                Relatório IA
              </DialogTitle>
              <DialogDescription>
                Use IA para gerar um relatório com insights sobre suas finanças.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>

            <DialogFooter>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading ? (
                  <Loader2Icon
                    className="animate-spin"
                    textDecoration={"Gerando..."}
                  />
                ) : (
                  "Gerar Relatório"
                )}
              </Button>
              <DialogClose asChild>
                <Button className="mr-2" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
