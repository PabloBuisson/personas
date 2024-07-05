export type PersonalInformationsRowProps = {
  cells: PersonalInformationsCell[];
  mode: "edit" | "view";
};

export type PersonalInformationsCell = {
  order: number;
  icon: string;
  label: string;
  name: string;
  value: string | number | undefined;
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
              <div>{cell.icon}</div>
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
            <div>{cell.icon}</div>
            <h4 className="text-xl font-medium">{cell.label}</h4>
            <p className="text-xl">{cell.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
