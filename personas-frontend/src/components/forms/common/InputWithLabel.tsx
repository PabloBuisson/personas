import AppIcon from "@/components/UI/AppIcon";
import LabelForm from "./LabelForm";

export default function InputWithLabel({
  label,
  inputId,
  informationMessage,
  errorMessage,
  withLongText = false,
  ...props
}: {
  label: string;
  inputId: string;
  informationMessage?: string;
  errorMessage?: string;
  withLongText?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <LabelForm label={label} inputId={inputId} />
      {informationMessage && (
        <div className="flex items-center gap-2 p-4 bg-purple-200 text-purple-800 rounded-sm text-sm">
          <AppIcon
            icon="mdi:lightbulb-outline"
            className="text-xl text-purple-25"
          />
          <p className="text-purple-800 text-sm">{informationMessage}</p>
        </div>
      )}
      <div className="relative w-full">
        {withLongText ? (
          <textarea
            {...props}
            id={inputId}
            name={inputId}
            className="px-3 py-4 text-xl font-normal rounded-md w-full"
          />
        ) : (
          <input
            {...props}
            id={inputId}
            name={inputId}
            className="px-3 py-4 text-xl font-normal rounded-md w-full"
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
