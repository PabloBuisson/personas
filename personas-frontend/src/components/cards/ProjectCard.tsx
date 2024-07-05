import Link from "next/link";
import { ProjectDto } from "@/app/api";
import Tag from "../tags/Tag";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function ProjectCard({
  project,
  onDelete,
}: {
  project: ProjectDto;
  onDelete?: (projectId: number | undefined) => void;
}) {
  const cardContent = (
    <>
      <div className="absolute flex justify-center items-center top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300">
        {project.icon && (
          <span className="text-4xl" role="image">
            {project.icon}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 py-3">
        <h2 className="text-xl font-bold mt-6">
          {project.name ?? "Untitled project"}
        </h2>
        <p>{project.description ?? "No description"}</p>
        {project?.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
          </ul>
        )}
      </div>
      <div className="-z-50 absolute top-[-0.5rem] left-[-0.5rem] w-[calc(100%+1rem)] h-[calc(100%+1rem)] bg-purple-200 [clip-path:polygon(2rem_0%,_calc(100%-2rem)_0%,_100%_2rem,_100%_calc(100%-2rem),_calc(100%-2rem)_100%,_2rem_100%,_0%_calc(100%-2rem),_0%_2rem)] noisy-background"></div>
    </>
  );

  return (
    <li
      className="text-base font-medium flex flex-col justify-center gap-4"
      key={project.id}
    >
      <article className="flex justify-center items-center h-full w-full text-purple-900 border-[0.15em] border-white relative">
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-45"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-45"></div>
        {/* <div className="bg-white w-[0.2em] h-[3.2rem] absolute top-[-0.6rem] left-[0.9rem] rotate-45"></div>
        <div className="bg-white w-[0.2em] h-[3.2rem] absolute top-[-0.6rem] right-[0.9rem] rotate-[-45deg]"></div>
        <div className="bg-white w-[0.2em] h-[3.2rem] absolute bottom-[-0.6rem] right-[0.9rem] rotate-45"></div>
        <div className="bg-white w-[0.2em] h-[3.2rem] absolute bottom-[-0.6rem] left-[0.9rem] rotate-[-45deg]"></div> */}
        {/* <div className="-z-40 absolute top-[-0.2em] left-[-0.2em] w-[calc(100%+0.4em)] h-[calc(100%+0.4em)] bg-white [clip-path:polygon(2rem_0%,_calc(100%-2rem)_0%,_100%_2rem,_100%_calc(100%-2rem),_calc(100%-2rem)_100%,_2rem_100%,_0%_calc(100%-2rem),_0%_2rem)] before:block before:relative before:top-[0.1em] before:left-[0.1em] before:[clip-path:inherit] before:bg-purple-200 before:w-[calc(100%-0.2em)] before:h-[calc(100%-0.2em)]"></div> */}
        {!onDelete && (
          <Link className="relative p-1 h-full" href={`/projects/${project.id}`}>
            {cardContent}
          </Link>
        )}
        {onDelete && <div className="relative p-1 h-full">{cardContent}</div>}
      </article>
      {onDelete && (
        <ButtonPrimary
          element="button"
          label="Unlink persona from project"
          elementProps={{ type: "button", onClick: () => onDelete(project.id) }}
        />
      )}
    </li>
  );
}
