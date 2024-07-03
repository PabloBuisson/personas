import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonSecondaryButtonProps = {
  element: "button";
  label: string;
  additionalCSS?: string;
  elementProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type ButtonSecondaryLinkProps = {
  element: "link";
  label: string;
  additionalCSS?: string;
  elementProps?: LinkProps;
};

type ButtonSecondaryProps =
  | ButtonSecondaryButtonProps
  | ButtonSecondaryLinkProps;

export default function ButtonSecondary({
  element,
  label,
  additionalCSS,
  elementProps,
}: ButtonSecondaryProps) {
  let finalCSS = `bg-gray-50 border-[0.2em] border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg ${
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
