import HomeSummaryList from "@/components/lists/HomeSummaryList";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-16 flex flex-col gap-16">
      <div className="flex items-center flex-wrap gap-4">
        <section>
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-extrabold">
              Create and manage
              <span className="text-darkorange-600"> personas </span> at ease.
            </h1>
            <p className="text-2xl max-w-[60ch]">
              Start a new project (ex. “New DnD campaign”) to manage your
              personas in one place. Or simply create a persona !
            </p>
          </div>
        </section>
        <div className="bg-white rounded-full w-56 h-56 relative overflow-hidden">
          <Image
            src={`/avatars/avatar-0.svg`}
            fill={true}
            alt="Picture of the avatar"
          />
        </div>
      </div>

      <div className="flex items-start gap-8">
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

      <HomeSummaryList targetName="projects" />
      <HomeSummaryList targetName="personas" />
    </main>
  );
}
