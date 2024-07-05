import { PersonaDto } from "@/app/api";

export default function PersonalInformationsJobHeader({
  persona,
  mode,
}: {
  persona: PersonaDto;
  mode: "edit" | "view";
}) {
  if (mode === "edit") {
    return (
      <div className="flex w-full">
        <div className="flex gap-2 bg-purple-200 text-purple-800 p-2 pr-6">
          <span aria-hidden className="text-xl">
            💼
          </span>
          <label className="text-xl font-medium" htmlFor="job-title">
            Job title
          </label>
        </div>
        <input
          className="text-xl px-4 grow"
          type="text"
          id="job-title"
          name="job-title"
          defaultValue={persona.job?.title}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="flex gap-2 bg-purple-200 text-purple-800 p-2 pr-6">
        <span aria-hidden className="text-xl">
          💼
        </span>
        <h4 className="text-xl font-medium">Job title</h4>
      </div>
      <div className="bg-white flex justify-start items-center grow">
        <p className="text-xl px-4">{persona.job?.title}</p>
      </div>
    </div>
  );
}
