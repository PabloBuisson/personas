import { handleCreateProject } from "@/app/actions/project-actions";

export default function CreateProjectForm() {
  return (
    <form action={handleCreateProject} className="flex flex-col gap-8">
      <div className="bg-gray-300 relative rounded-full w-28 h-28">
        <button type="button" aria-label="Change emoticon">
          <div className="bg-gray-50 absolute bottom-0 right-0 rounded-full w-12 h-12"></div>
        </button>
      </div>
      <input
        id="title"
        name="title"
        className="text-5xl font-extrabold"
        value="New project"
      />
      <textarea
        id="description"
        name="description"
        className="text-xl font-medium"
        value="Description of the project"
      />
      <div>
        <input id="tag" name="tag"></input>
        <button type="button">Add a tag</button>
      </div>
      <button type="submit">Create project</button>
    </form>
  );
}
