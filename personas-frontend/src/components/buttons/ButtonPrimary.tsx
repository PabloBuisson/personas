"use client";

import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonPrimaryButtonProps = {
  element: "button";
  label: string;
  additionalCSS?: string;
  elementProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type ButtonPrimaryLinkProps = {
  element: "link";
  label: string;
  additionalCSS?: string;
  elementProps?: LinkProps;
};

type ButtonPrimaryProps = ButtonPrimaryButtonProps | ButtonPrimaryLinkProps;

export default function ButtonPrimary({
  element,
  label,
  additionalCSS,
  elementProps,
}: ButtonPrimaryProps) {
  let finalCSS = `bg-darkorange-500 border-[0.2em] text-white border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg whitespace-nowrap ${
    additionalCSS ?? ""
  }`;

  if (element === "link") {
    return (
      <Link
        {...elementProps}
        className={finalCSS}
        href={elementProps?.href ?? ""}
      >
        {label}
      </Link>
    );
  }

  return (
    <button {...elementProps} className={finalCSS}>
      {label}
    </button>
  );
}
