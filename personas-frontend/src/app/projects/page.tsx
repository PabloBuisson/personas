import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";
import { MOCK_DATA_PROJECTS, MOCK_DATA_TAGS } from "../mock/mock-data";

export default function Projects() {
  return (
    <main className="p-16 flex flex-col gap-16">
      <h1 className="text-5xl font-extrabold">My projects</h1>
      <div className="flex flex-col gap-12">
        <ul className="flex flex-wrap gap-8">
          {MOCK_DATA_TAGS.map((tag) => (
            <Tag key={tag} id={tag} name={tag} size="text-base" link={tag} />
          ))}
        </ul>
        <ul className="flex flex-wrap gap-8">
          {MOCK_DATA_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </main>
  );
}
