"use client";

import { deleteProject } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";

export default function ButtonDeleteProject({
  projectId,
}: {
  projectId: number;
}) {
  const router = useRouter();

  async function handleDeleteProject() {
    await deleteProject(projectId);
    
    router.replace("/projects");
    router.refresh();
  }

  return (
    <button
      className="bg-red-700 hover:bg-red-800 text-white border-[0.2em] border-red-700 px-[1.6em] py-[1.2em] rounded-lg"
      type="button"
      onClick={handleDeleteProject}
    >
      Delete Project
    </button>
  );
}
