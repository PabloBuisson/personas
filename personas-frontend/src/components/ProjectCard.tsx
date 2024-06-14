import Link from "next/link";
import Tag from "./Tag";
import { ProjectDto } from "@/app/api";

export default function ProjectCard({ project }: { project: ProjectDto }) {
  return (
    <li className="text-base font-medium" key={project.id}>
      <article className="flex justify-center items-center h-full w-full bg-gray-300 border-[0.2em] border-gray-300 rounded-lg">
        <Link className="relative p-1" href={`${project.id}`}>
          <div className="absolute top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300"></div>
          <div className="flex flex-col gap-4 px-4 py-3 border-[0.1em] border-white">
            <h2 className="text-xl font-bold mt-6">
              {project.name ?? "Untitled project"}
            </h2>
            <p>{project.description ?? "No description"}</p>
            {project?.tags && (
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    id={tag.id}
                    name={tag.label}
                    size="text-sm"
                  />
                ))}
              </ul>
            )}
          </div>
        </Link>
      </article>
    </li>
  );
}
