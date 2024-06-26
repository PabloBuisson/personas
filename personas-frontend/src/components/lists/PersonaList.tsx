import { PersonaDto } from "@/app/api";
import { getPersonas } from "@/app/api/endpoints";
import PersonaCard from "../cards/PersonaCard";

export default async function PersonaList() {
  let personas: PersonaDto[] = await getPersonas();

  return (
    personas &&
    personas.length > 0 && (
      <ul className="flex flex-wrap gap-8">
        {personas.map((project: any) => (
          <PersonaCard key={project.id} persona={project} />
        ))}
      </ul>
    )
  );
}
