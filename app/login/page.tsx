import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-semibold">Bem-Vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <div className="flex flex-col gap-4">
          <Button variant={"outline"} className="">
            <LogInIcon size={16} className="mr-2" />
            Fazer login ou cadastrar-se
          </Button>
          
        </div>
      </div>
      {/*Direita*/}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
