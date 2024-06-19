import LabelForm from "./LabelForm";

export default function InputWithLabel({
  label,
  inputId,
  informationMessage,
  withLongText = false,
  ...props
}: {
  label: string;
  inputId: string;
  informationMessage?: string;
  withLongText?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <LabelForm label={label} inputId={inputId} />
      {informationMessage && (
        <p className="p-4 bg-gray-200 rounded-sm text-sm">{informationMessage}</p>
      )}
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
