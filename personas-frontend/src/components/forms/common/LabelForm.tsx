import { LabelHTMLAttributes } from "react";

interface LabelFormProps {
  children?: React.ReactNode;
  label: string;
  inputId: string;
}

export default function LabelForm({
  children,
  label,
  inputId,
  ...props
}: LabelFormProps & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-xl font-semibold" {...props} htmlFor={inputId}>
      {label}
      {children && children}
    </label>
  );
}
