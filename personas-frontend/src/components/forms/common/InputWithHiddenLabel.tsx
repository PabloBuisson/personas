import LabelForm from "./LabelForm";

interface InputWithLabelProps {
  label: string;
  inputId: string;
  informationMessage?: string;
  withLongText?: boolean;
}

export default function InputWithHiddenLabel({
  label,
  inputId,
  informationMessage,
  withLongText = false,
  ...props
}: InputWithLabelProps &
  (
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  )) {
  return (
    <div className="flex flex-col gap-4">
      {informationMessage && (
        <p className="p-4 bg-gray-200 rounded-sm text-sm">
          {informationMessage}
        </p>
      )}
      {/* only hide the label, not the input */}
      <LabelForm className="sr-only" label={label} inputId={inputId} />
      {withLongText ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={inputId}
          name={inputId}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          id={inputId}
          name={inputId}
        />
      )}
      {/* <p>Error message</p> */}
    </div>
  );
}
