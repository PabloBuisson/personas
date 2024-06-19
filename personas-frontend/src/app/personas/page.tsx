import PersonaList from "@/components/lists/PersonaList";
import { Suspense } from "react";

export default function Personas() {
  return (
    <main className="p-16 flex flex-col gap-16">
      <h1 className="text-5xl font-extrabold">My personas</h1>
      <div className="flex flex-col gap-12">
        <Suspense fallback="Personas loading...">
          <PersonaList />
        </Suspense>
      </div>
    </main>
  );
}
