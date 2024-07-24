import { PersonalInformationsCell } from "../settings/personal-informations-cell-type.type";
import AppIcon from "@/components/UI/AppIcon";

export type PersonalInformationsRowProps = {
  cells: PersonalInformationsCell[];
  mode: "edit" | "view";
};

const classesByOrder: Record<number, string> = {
  1: "grow basis-1/12 border-purple-100 border-b-2 xl:border-r-2 xl:border-b-0 border-dotted",
  2: "grow border-b-2 xl:border-r-2 xl:border-b-0 border-purple-100 border-dotted",
  3: "grow basis-1/2",
};

export default function PersonalInformationsRow(
  informations: PersonalInformationsRowProps
) {
  if (informations.mode === "edit") {
    return (
      <section className="w-full bg-white">
        <ul className="flex flex-col xl:flex-row">
          {informations.cells.map((cell) => (
            <li
              className={`flex flex-col gap-2 py-8 px-8 relative ${
                classesByOrder[cell.order]
              }`}
              key={cell.name}
            >
              {cell.errorMessage?.message && (
                <div className="flex items-center gap-2 bg-red-800 py-2 pl-2 pr-4 absolute top-0 translate-y-[-50%] left-3 rounded-sm">
                  <AppIcon
                    icon="mdi:alert-circle-outline"
                    className="text-lg text-red-300"
                  />
                  <p className=" text-red-50 text-sm">
                    {cell.errorMessage.message}
                  </p>
                </div>
              )}
              <AppIcon icon={cell.icon} className="text-2xl text-pink-500" />
              <label className="text-xl font-medium" htmlFor={cell.name}>
                {cell.label}
              </label>
              <input
                className="text-xl"
                type="text"
                id={cell.name}
                name={cell.name}
                defaultValue={cell.value}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="w-full bg-white">
      <ul className="flex flex-col xl:flex-row">
        {informations.cells.map((cell) => (
          <li
            className={`flex flex-col gap-2 py-8 px-8 ${
              classesByOrder[cell.order]
            }`}
            key={cell.name}
          >
            <AppIcon icon={cell.icon} className="text-2xl text-pink-500" />
            <h4 className="text-xl font-medium">{cell.label}</h4>
            <p className="text-xl min-w-[20ch]">{cell.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
