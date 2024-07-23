import { ErrorMessageInput } from "../settings/form-actions-settings-type.type";

export type InputBaseProps = {
  label: string;
  inputId: string;
  informationMessage?: string;
  errorMessage?: ErrorMessageInput;
};

export type InputWithLabelProps = InputBaseProps & {
  withLongText?: false;
} & React.ComponentPropsWithoutRef<"input">;

export type TextAreaWithLabelProps = InputBaseProps & {
  withLongText: true;
} & React.ComponentPropsWithoutRef<"textarea">;
