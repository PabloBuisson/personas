import { ProjectDto } from "@/app/api";
import { getProjectById } from "@/app/api/endpoints";
import CreatePersonaCard from "@/components/CreatePersonaCard";
import PersonaCard from "@/components/PersonaCard";
import Tag from "@/components/Tag";
import CreateProjectForm from "@/components/forms/CreateProjectForm";

export default async function Project({
  params,
}: {
  params: { projectId: number | string };
}) {
  const projectId = params.projectId;

  if (projectId === "new") {
    return (
      <main className="p-16">
        <CreateProjectForm />
      </main>
    );
  }

  let project: ProjectDto = await getProjectById(projectId);

  return (
    <main className="p-16 flex flex-col gap-8">
      <div className="bg-gray-300 rounded-full w-28 h-28"></div>
      <h1 className="text-5xl font-extrabold">{project.name}</h1>
      <p className="text-xl font-medium">{project.description}</p>
      <section className="mt-8 flex flex-col gap-12">
        {project?.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
            <input id="new-tag" name="new-tag"></input>
            <button>Add a tag</button>
          </ul>
        )}
        <ul className="flex flex-wrap gap-16">
          <CreatePersonaCard id={"new-persona"} />
          {project?.personas && (
            <>
              {project.personas.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} />
              ))}
            </>
          )}
        </ul>
      </section>
    </main>
  );
}
