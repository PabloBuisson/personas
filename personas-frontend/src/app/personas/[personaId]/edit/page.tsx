import { Metadata } from "next";

import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import EditPersonaForm from "@/components/forms/edit/EditPersonaForm";

export const metadata: Metadata = {
  title: "Edit persona",
};

export default async function EditPersona({
  params,
}: {
  params: { personaId: string };
}) {
  const personaId = params.personaId;

  // TODO get cached Project ?
  let persona: PersonaDto = await getPersonaById(personaId);

  return (
    <main className="p-0 pt-8 md:p-16 md:pt-8 flex flex-col gap-8">
      <EditPersonaForm persona={persona} />
    </main>
  );
}
