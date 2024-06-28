export type PersonalInformationsRowProps = {
  cells: PersonalInformationsCell[];
};

export type PersonalInformationsCell = {
  order: number;
  icon: string;
  label: string;
  name: string;
  value: string | number | undefined;
};

const classesByOrder: Record<number, string> = {
  1: "basis-1/12 border-r-2 border-dotted",
  2: "pl-8 border-r-2 border-dotted",
  3: "pl-8 basis-1/2",
};

export default function PersonalInformationsRow(
  informations: PersonalInformationsRowProps
) {
  return (
    <section className="w-full bg-white p-8">
      <ul className=" flex">
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
