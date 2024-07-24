import AppIcon, { AppIconNameProps } from "@/components/UI/AppIcon";

type PersonaSecondaryInfosBlockProps = {
  id: string;
  mode: "edit" | "view";
  label: string;
  name: string | undefined;
  icon: AppIconNameProps;
  value: string | number | undefined;
  isStandalone?: boolean;
};

export default function PersonaSecondaryInfosBlock(
  props: PersonaSecondaryInfosBlockProps
) {
  if (props.mode === "edit") {
    return (
      <section
        key={props.id}
        className={`flex flex-col gap-2 ${
          props.isStandalone ? "w-full grow" : "w-full xl:w-1/3 grow"
        }`}
      >
        <header className="relative w-full bg-white p-4">
          <div className="absolute flex justify-center items-center left-0 top-0 text-3xl text-purple-200 bg-white translate-y-[-100%] py-2 px-3 rounded-t">
            <AppIcon icon={props.icon} />
          </div>
          <label htmlFor={props.name} className="text-2xl font-semibold">
            {props.label}
          </label>
          <div className="absolute right-0 top-0 text-3xl bg-white translate-y-[-100%] py-2 px-3 rounded-t text-darkorange-500">
            <button
              type="button"
              aria-label="Hide section"
              className="flex justify-center items-center "
            >
              <AppIcon icon="mdi:eye-off-outline" />
            </button>
          </div>
        </header>
        <div className="w-full bg-white p-4 rounded-b">
          <textarea
            id={props.name}
            name={props.name}
            className="w-full h-[20ch]"
            defaultValue={props.value}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      key={props.id}
      className={`flex flex-col gap-2 ${
        props.isStandalone ? "w-full grow" : "w-full xl:w-1/3 grow"
      }`}
    >
      <header className="relative w-full bg-white p-4">
        <div className="absolute flex justify-center items-center left-0 top-0 text-3xl text-purple-200 bg-white translate-y-[-100%] py-2 px-3 rounded-t">
          <AppIcon icon={props.icon} />
        </div>
        <h1 className="text-2xl font-semibold">{props.label}</h1>
      </header>
      <div className="w-full bg-white p-4 rounded-b h-[20ch]">
        <p>{props.value}</p>
      </div>
    </section>
  );
}
