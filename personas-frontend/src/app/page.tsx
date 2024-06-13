import HomeSummaryList from "@/components/HomeSummaryList";
import Image from "next/image";
import Link from "next/link";

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
        <Link
          className="bg-gray-300 border-[0.2em] border-gray-300 px-8 py-6 rounded-lg text-xl font-medium"
          href={"projects/new"}
        >
          Start a project
        </Link>
        <Link
          className="bg-gray-50 border-[0.2em] border-gray-300 px-8 py-6 rounded-lg text-xl font-medium"
          href={"personas/new"}
        >
          Create a persona
        </Link>
      </div>

      <HomeSummaryList targetName="projects" />
      <HomeSummaryList targetName="personas" />
    </main>
  );
}
