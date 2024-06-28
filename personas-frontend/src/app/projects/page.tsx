import ProjectList from "@/components/lists/ProjectList";
import TagList from "@/components/tags/TagList";
import { Suspense } from "react";

export default async function Projects({
  searchParams,
}: {
  searchParams: { tag: number };
}) {
  return (
    <main className="p-16 flex flex-col gap-16">
      <h1 className="text-5xl font-extrabold">My projects</h1>
      <div className="flex flex-col gap-12">
        {/* TODO one Suspense with skeleton */}
        <Suspense fallback="Tags loading...">
          <TagList />
        </Suspense>
        <Suspense fallback="Projects loading...">
          <ProjectList tagId={searchParams.tag} />
        </Suspense>
      </div>
    </main>
  );
}
