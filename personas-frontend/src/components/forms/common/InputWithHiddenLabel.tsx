import AppIcon from "@/components/UI/AppIcon";
import LabelForm from "./LabelForm";

interface InputWithLabelProps {
  label: string;
  inputId: string;
  informationMessage?: string;
  errorMessage?: string;
  withLongText?: boolean;
}

export default function InputWithHiddenLabel({
  label,
  inputId,
  informationMessage,
  errorMessage,
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
      <div className="relative w-full">
        <LabelForm className="sr-only" label={label} inputId={inputId} />
        {withLongText ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            id={inputId}
            style={{ width: "100%" }}
            name={inputId}
          />
        ) : (
          <input
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            id={inputId}
            style={{ width: "100%" }}
            name={inputId}
          />
        )}
        {errorMessage && (
          <div className="flex items-center gap-2 bg-red-800 py-2 pl-2 pr-4 absolute top-0 translate-y-[-50%] left-3 rounded-sm">
            <AppIcon
              icon="mdi:alert-circle-outline"
              className="text-lg text-red-300"
            />
            <p className=" text-red-50 text-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
