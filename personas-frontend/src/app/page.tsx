import HomeSummaryList from "@/components/lists/HomeSummaryList";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import Image from "next/image";
import { SummaryDto } from "./api";
import { getSummary } from "./api/endpoints";

export default async function Home() {
  const summary: SummaryDto = await getSummary();

  return (
    <main className="px-16 py-12 flex flex-col gap-24">
      <section className="flex items-start flex-wrap gap-8">
        <div>
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-extrabold">
              Create and manage
              <span className="text-darkorange-600"> personas </span> at ease.
            </h1>
            <p className="text-2xl max-w-[60ch]">
              Start a new project (ex. “New DnD campaign”) to manage your
              personas in one place. Or simply create a persona !
            </p>
            <div className="flex items-start gap-8 mt-12">
              <ButtonPrimary
                element="link"
                label="Start a project"
                elementProps={{ href: "projects/new" }}
                additionalCSS="text-xl font-medium"
              />
              <ButtonSecondary
                element="link"
                label="Create a persona"
                elementProps={{ href: "personas/new" }}
                additionalCSS="text-xl font-medium"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-full w-56 h-56 relative overflow-hidden">
          <Image
            src={`/avatars/avatar-0.svg`}
            fill={true}
            priority={true}
            alt="Picture of the avatar"
          />
        </div>
      </section>

      <HomeSummaryList targetName="projects" data={summary.projects} />
      <HomeSummaryList targetName="personas" data={summary.personas} />
    </main>
  );
}
