import { PersonaDto, ProjectDto } from "@/app/api";
import Link from "next/link";
import PersonaCard from "../cards/PersonaCard";
import ProjectCard from "../cards/ProjectCard";
import SecondaryTitle from "../UI/SecondaryTitle";
import CreatePersonaCard from "../cards/CreatePersonaCard";
import CreateProjectCard from "../cards/CreateProjectCard";

type HomeSummaryProjectListProps = {
  targetName: "projects";
  data: ProjectDto[] | undefined;
};

type HomeSummaryPersonaListProps = {
  targetName: "personas";
  data: PersonaDto[] | undefined;
};

type HomeSummaryListProps =
  | HomeSummaryProjectListProps
  | HomeSummaryPersonaListProps;

export default function HomeSummaryList({
  targetName,
  data,
}: HomeSummaryListProps) {
  return (
    <section
      className={`flex flex-col ${
        targetName === "projects" ? "gap-10" : "gap-8"
      }`}
    >
      <div className="flex items-center gap-8">
        <SecondaryTitle title={`Last created ${targetName ?? "projects"}`} />
        {data && data.length > 0 && (
          <Link
            className="text-lg font-bold underline underline-offset-4 decoration-[0.2rem] decoration-dotted decoration-darkorange-500"
            href={`${"/" + targetName ?? "projects"}`}
          >
            See all
          </Link>
        )}
      </div>
      {data && data.length > 0 && (
        <div>
          <ul className="flex flex-wrap gap-8">
            {targetName === "projects" &&
              data &&
              data.map((project) => {
                return <ProjectCard key={project.id} project={project} />;
              })}
            {targetName === "personas" &&
              data &&
              data.map((persona) => {
                return <PersonaCard key={persona.id} persona={persona} />;
              })}
          </ul>
        </div>
      )}
      {(!data || data.length === 0) && (
        <ul className="w-[30ch] h-[30ch]">
          {targetName === "personas" && <CreatePersonaCard id="new" />}
          {targetName === "projects" && <CreateProjectCard id="new" />}
        </ul>
      )}
    </section>
  );
}
