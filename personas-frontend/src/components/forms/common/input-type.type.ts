type InputBaseProps = {
  label: string;
  inputId: string;
  informationMessage?: string;
  errorMessage?: { message: string; timestamp: number };
};

type InputWithLabelProps = InputBaseProps & {
  withLongText?: false;
} & React.ComponentPropsWithoutRef<"input">;

type TextAreaWithLabelProps = InputBaseProps & {
  withLongText: true;
} & React.ComponentPropsWithoutRef<"textarea">;
