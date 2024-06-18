import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonSecondaryProps {
  label: string;
  callback?: () => {};
  additionalCSS?: string;
}

export default function ButtonSecondary({
  label,
  callback,
  additionalCSS,
  ...props
}: ButtonSecondaryProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  let finalCSS = `bg-gray-50 border-[0.2em] border-gray-300 px-[1.6em] py-[1.2em] rounded-lg ${
    additionalCSS ?? ""
  }`;

  return (
    <button {...props} className={finalCSS} onClick={callback}>
      {label}
    </button>
  );
}
