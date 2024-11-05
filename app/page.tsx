import { Button }  from "./_components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <h1 className="p-5 text-amber-300">Home Page</h1>
      <Button>Hello World</Button>
    </div>
  );
}
