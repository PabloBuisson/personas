export default function PersonaSectionMultiInfosTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center justify-start gap-4">
      <span
        aria-hidden
        className="text-5xl font-semibold text-darkorange-500 flex items-center justify-center"
      >
        +
      </span>
      <h2 className="text-3xl text-orange-900 font-semibold">{title}</h2>
    </div>
  );
}
