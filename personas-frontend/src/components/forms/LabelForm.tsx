export default function LabelForm({
  label,
  inputId,
}: {
  label: string;
  inputId: string;
}) {
  return (
    <label className="text-xl font-semibold" htmlFor={inputId}>
      {label}
    </label>
  );
}
