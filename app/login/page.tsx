import { Button } from "../_components/ui/button";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function LoginPage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }

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
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button>
            <LogInIcon size={16} className="mr-2" />
            Fazer login ou cadastrar-se
          </Button>
        </SignInButton>
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
