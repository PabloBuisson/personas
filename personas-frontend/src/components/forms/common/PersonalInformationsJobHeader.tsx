import { PersonaDto } from "@/app/api";
import AppIcon from "@/components/UI/AppIcon";

export default function PersonalInformationsJobHeader({
  persona,
  mode,
}: {
  persona: PersonaDto;
  mode: "edit" | "view";
}) {
  if (mode === "edit") {
    return (
      <div className="flex flex-col 2xl:flex-row w-full">
        <div className="flex gap-4 bg-purple-200 text-purple-800 py-2 pl-4 pr-6 items-center">
          <AppIcon icon="mdi:work" className="text-2xl text-purple-50" />
          <label className="text-xl font-medium" htmlFor="job-title">
            Job title
          </label>
        </div>
        <input
          className="text-xl px-4 grow min-h-[2.75em]"
          type="text"
          id="job-title"
          name="job-title"
          defaultValue={persona.job?.title}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col 2xl:flex-row w-full">
      <div className="flex gap-4 bg-purple-200 text-purple-800 py-2 pl-4 pr-6 items-center">
        <AppIcon icon="mdi:work" className="text-2xl text-purple-50" />
        <h4 className="text-xl font-medium">Job title</h4>
      </div>
      <div className="bg-white flex justify-start items-center h-[2.75em] 2xl:h-auto grow">
        <p className="text-xl px-4">{persona.job?.title}</p>
      </div>
    </div>
  );
}
