import { ProjectDto } from "@/app/api";
import { getProjects } from "@/app/api/endpoints";
import ProjectCard from "../cards/ProjectCard";

export default async function ProjectList({ tagId }: { tagId?: number }) {
  let projects: ProjectDto[] = await getProjects(tagId);

  return (
    projects &&
    projects.length > 0 && (
      <ul className="flex flex-wrap gap-16">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    )
  );
}
