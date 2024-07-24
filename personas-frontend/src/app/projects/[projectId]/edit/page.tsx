import { Metadata } from "next";

import { ProjectDto } from "@/app/api";
import { getProjectById } from "@/app/api/endpoints";
import EditProjectForm from "@/components/forms/edit/EditProjectForm";

export const metadata: Metadata = {
  title: "Edit project",
};

export default async function EditProject({
  params,
}: {
  params: { projectId: number };
}) {
  const projectId = params.projectId;

  // TODO get cached Project ?
  let project: ProjectDto = await getProjectById(projectId);

  return (
    <main className="p-16 flex flex-col gap-8">
      <EditProjectForm project={project} />
    </main>
  );
}
