import { Metadata } from "next";

import { ProjectDto } from "@/app/api";
import { getProjectById } from "@/app/api/endpoints";
import CreatePersonaCard from "@/components/cards/CreatePersonaCard";
import PersonaCard from "@/components/cards/PersonaCard";
import Tag from "@/components/tags/Tag";
import ButtonDeleteItem from "@/components/buttons/ButtonDeleteItem";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

export const metadata: Metadata = {
  title: "Project details",
};

export default async function Project({
  params,
}: {
  params: { projectId: number };
}) {
  const projectId = params.projectId;

  let project: ProjectDto = await getProjectById(projectId);

  return (
    <main className="p-0 pt-8 md:p-16 flex flex-col gap-8">
      <div className="flex justify-between items-start gap-16">
        <div className="bg-white rounded-full w-28 h-28 flex justify-center items-center">
          {project.icon && (
            <span className="text-6xl" role="image">
              {project.icon}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-8">
          <ButtonPrimary
            element="link"
            label="Edit Project"
            elementProps={{ href: "edit" }}
          />
          <ButtonDeleteItem item="project" itemId={projectId} />
        </div>
      </div>
      <h1 className="text-5xl font-extrabold">{project.name}</h1>
      <p className="text-xl font-medium">{project.description}</p>
      <section className="mt-8 flex flex-col gap-12">
        {project?.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
          </ul>
        )}
        <ul className="flex flex-wrap gap-16">
          <CreatePersonaCard id={"new-persona"} projectId={project.id} />
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
