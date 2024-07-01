export default function PersonaSecondaryInfosBlock({
  key,
  mode,
  label,
  name,
  icon,
  value,
}: {
  key: string;
  mode: "edit" | "view";
  label: string;
  name: string | undefined;
  icon: string;
  value: string | undefined;
}) {
  if (mode === "edit") {
    return (
      <section key={key} className="flex flex-col gap-2 w-1/4">
        <header className="relative w-full bg-white p-4">
          <div className="absolute left-0 top-0 text-2xl bg-white translate-y-[-100%] p-2 rounded-t">
            {icon}
          </div>
          <label htmlFor={name} className="text-2xl font-semibold">{label}</label>
          <div className="absolute right-0 top-0 text-2xl bg-white translate-y-[-100%] p-2 rounded-t">
            <button type="button" aria-label="Cacher la section">
              👁️‍🗨️
            </button>
          </div>
        </header>
        <div className="w-full bg-white p-4 rounded-b">
          <textarea id={name} name={name} className="w-full h-32" defaultValue={value} />
        </div>
      </section>
    );
  }

  return (
    <section key={key} className="flex flex-col gap-2 w-1/4">
      <header className="relative w-full bg-white p-4">
        <div className="absolute left-0 top-0 text-2xl bg-white translate-y-[-100%] p-2 rounded-t">
          {icon}
        </div>
        <h1 className="text-2xl font-semibold">{label}</h1>
      </header>
      <div className="w-full bg-white p-4 rounded-b">
        <p>{value}</p>
      </div>
    </section>
  );
}
