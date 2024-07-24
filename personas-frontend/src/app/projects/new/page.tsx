import { Metadata } from "next";

import CreateProjectForm from "@/components/forms/create/CreateProjectForm";

export const metadata: Metadata = {
  title: "Create a project",
};

export default async function CreateProject() {
  return (
    <main className="p-0 pt-8 md:p-16">
      <CreateProjectForm />
    </main>
  );
}
