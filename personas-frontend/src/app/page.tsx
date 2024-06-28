import HomeSummaryList from "@/components/lists/HomeSummaryList";
import ButtonLinkPrimary from "@/components/buttons/ButtonLinkPrimary";
import ButtonLinkSecondary from "@/components/buttons/ButtonLinkSecondary";

export default function Home() {
  return (
    <main className="p-16 flex flex-col gap-16">
      <div className="flex items-center flex-wrap">
        <section>
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-extrabold">
              Create and manage personas at ease.
            </h1>
            <p className="text-2xl max-w-[60ch]">
              Start a new project (ex. “New DnD campaign”) to manage your
              personas in one place. Or simply create a persona !
            </p>
          </div>
        </section>
        <div className="bg-gray-300 rounded-full w-56 h-56"></div>
      </div>

      <div className="flex items-start gap-8">
        <ButtonLinkPrimary
          label="Start a project"
          href="projects/new"
          additionalCSS="text-xl font-medium"
        />
        <ButtonLinkSecondary
          label="Create a persona"
          href="personas/new"
          additionalCSS="text-xl font-medium"
        />
      </div>

      <HomeSummaryList targetName="projects" />
      <HomeSummaryList targetName="personas" />
    </main>
  );
}
