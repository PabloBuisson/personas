import AppIcon from "@/components/UI/AppIcon";
import LabelForm from "./LabelForm";
import { useState } from "react";

type InputWithVisibleLabelProps = InputWithLabelProps | TextAreaWithLabelProps;

type ErrorState = {
  message?: string;
  timestamp?: number;
};

export default function InputWithLabel({
  label,
  inputId,
  informationMessage,
  errorMessage,
  withLongText,
  ...props
}: InputWithVisibleLabelProps) {
  const [errorState, setErrorState] = useState<ErrorState>();

  function clearErrorMessage(event: any) {
    if (errorMessage && event.target.value) {
      console.log("clearErrorMessage", [errorMessage, event.target.value]);
      setErrorState((previousState) => ({
        ...previousState,
        message: undefined,
      }));
    }
  }

  // Display the error message after the first AND the next server side validations
  // The timestamp act as a unique identifier for the error message
  // If the timestamp is different, this means that it's coming from a different validation
  if (
    errorMessage?.message &&
    !errorState?.message &&
    (!errorState?.timestamp ||
      errorState?.timestamp !== errorMessage?.timestamp)
  ) {
    setErrorState({
      message: errorMessage?.message,
      timestamp: errorMessage?.timestamp,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <LabelForm label={label} inputId={inputId} />
      {informationMessage && (
        <div className="flex items-center gap-2 px-3 py-3 bg-purple-200 text-purple-800 rounded-sm text-sm">
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
            {...(props as React.ComponentPropsWithoutRef<"textarea">)}
            id={inputId}
            name={inputId}
            className={`px-3 py-4 text-xl font-normal rounded-md w-full ${
              errorState?.message
                ? "shadow-[0_0_0_0.125rem_red] shadow-red-800"
                : ""
            }`}
            onInput={(e) => clearErrorMessage(e)}
          />
        ) : (
          <input
            {...(props as React.ComponentPropsWithoutRef<"input">)}
            id={inputId}
            name={inputId}
            className={`px-3 py-4 text-xl font-normal rounded-md w-full ${
              errorState?.message
                ? "shadow-[0_0_0_0.125rem_red] shadow-red-800"
                : ""
            }`}
            onInput={(e) => clearErrorMessage(e)}
          />
        )}
        {errorState?.message && (
          <div className="flex items-center gap-2 bg-red-800 py-2 pl-2 pr-4 absolute top-0 translate-y-[-50%] left-3 rounded-sm">
            <AppIcon
              icon="mdi:alert-circle-outline"
              className="text-lg text-red-300"
            />
            <p className=" text-red-50 text-sm">{errorState.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
