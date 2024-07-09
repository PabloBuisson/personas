import { PersonalInformationsCell } from "./personal-informations-cell";
import AppIcon from "@/components/UI/AppIcon";

export type PersonalInformationsRowProps = {
  cells: PersonalInformationsCell[];
  mode: "edit" | "view";
};

const classesByOrder: Record<number, string> = {
  1: "pr-8 basis-1/12 border-purple-100 border-r-2 border-dotted",
  2: "px-8 border-r-2 border-purple-100 border-dotted",
  3: "px-8 basis-1/2",
};

export default function PersonalInformationsRow(
  informations: PersonalInformationsRowProps
) {
  if (informations.mode === "edit") {
    return (
      <section className="w-full bg-white p-8">
        <ul className="flex">
          {informations.cells.map((cell) => (
            <li
              className={`flex flex-col gap-2 ${classesByOrder[cell.order]}`}
              key={cell.name}
            >
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
    <section className="w-full bg-white p-8">
      <ul className=" flex">
        {informations.cells.map((cell) => (
          <li
            className={`flex flex-col gap-2 ${classesByOrder[cell.order]}`}
            key={cell.name}
          >
            <AppIcon icon={cell.icon} className="text-2xl text-pink-500" />
            <h4 className="text-xl font-medium">{cell.label}</h4>
            <p className="text-xl">{cell.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
