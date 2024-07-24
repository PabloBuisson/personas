import { Metadata } from "next";
import { Suspense } from "react";

import ProjectList from "@/components/lists/ProjectList";
import TagList from "@/components/tags/TagList";

export const metadata: Metadata = {
  title: "My projects",
};

export default async function Projects({
  searchParams,
}: {
  searchParams: { tag: number };
}) {
  return (
    <main className="p-0 pt-8 md:p-16 flex flex-col gap-16">
      <h1 className="text-5xl font-extrabold">My projects</h1>
      <div className="flex flex-col gap-16">
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
