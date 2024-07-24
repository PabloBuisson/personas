import { Metadata } from "next";

import CreatePersonaForm from "@/components/forms/create/CreatePersonaForm";

export const metadata: Metadata = {
  title: "Create a persona",
};

export default async function CreatePersona({
  searchParams,
}: {
  searchParams: { project?: string };
}) {
  const projectId = isNaN(Number(searchParams.project))
    ? undefined
    : Number(searchParams.project);

  return (
    <main className="p-16">
      <CreatePersonaForm projectId={projectId} />
    </main>
  );
}
