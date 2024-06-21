"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonPrimaryProps {
  label: string;
  additionalCSS?: string;
}

export default function ButtonPrimary({
  label,
  additionalCSS,
  ...props
}: ButtonPrimaryProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  let finalCSS = `bg-gray-300 border-[0.2em] border-gray-300 px-[1.6em] py-[1.2em] rounded-lg ${
    additionalCSS ?? ""
  }`;

  return (
    <button {...props} className={finalCSS}>
      {label}
    </button>
  );
}
