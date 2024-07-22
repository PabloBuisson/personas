import AppIcon from "@/components/UI/AppIcon";
import LabelForm from "./LabelForm";
import { useState } from "react";

type InputWithHiddenLabelProps = InputWithLabelProps | TextAreaWithLabelProps;

type ErrorState = {
  message?: string;
  hasBeenChecked?: boolean;
  hasBeenCleared?: boolean;
};

export default function InputWithHiddenLabel({
  label,
  inputId,
  informationMessage,
  errorMessage,
  withLongText,
  ...props
}: InputWithHiddenLabelProps) {
  const [errorState, setErrorState] = useState<ErrorState>();

  function clearErrorMessage(event: any) {
    if (errorMessage && event.target.value) {
      setErrorState((previousState) => ({
        ...previousState,
        message: undefined,
        hasBeenCleared: true,
      }));
    }
  }

  if (
    errorMessage &&
    !errorState?.message &&
    !errorState?.hasBeenCleared &&
    !errorState?.hasBeenChecked
  ) {
    setErrorState({
      message: errorMessage,
      hasBeenChecked: true,
    });
  }

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
            id={inputId}
            style={{ width: "100%" }}
            name={inputId}
            {...(props as React.ComponentPropsWithoutRef<"textarea">)}
          />
        ) : (
          <input
            id={inputId}
            style={{ width: "100%" }}
            name={inputId}
            {...(props as React.ComponentPropsWithoutRef<"input">)}
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
