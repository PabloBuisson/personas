import LabelForm from "./LabelForm";

export default function InputWithLabel({
  label,
  inputId,
  withLongText = false,
  ...props
}: {
  label: string;
  inputId: string;
  withLongText?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <LabelForm label={label} inputId={inputId} />
      {withLongText ? (
        <textarea
          {...props}
          id={inputId}
          name={inputId}
          className="px-3 py-4 text-xl font-normal rounded-md"
        />
      ) : (
        <input
          {...props}
          id={inputId}
          name={inputId}
          className="px-3 py-4 text-xl font-normal rounded-md"
        />
      )}
      <p>Error message</p>
    </div>
  );
}
