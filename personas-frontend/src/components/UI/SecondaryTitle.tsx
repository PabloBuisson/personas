import AppIcon from "./AppIcon";

export default function SecondaryTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-start gap-4">
      <AppIcon
        icon="mdi:plus-thick"
        className="text-4xl font-semibold text-darkorange-500"
      />
      <h2 className="text-3xl text-orange-900 font-semibold">{title}</h2>
    </div>
  );
}
