import { cn } from "@/app/utils/utils";
import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, HTMLProps } from "react";

type ButtonSecondaryButtonProps = {
  element: "button";
  label: string;
  className?: HTMLProps<HTMLElement>["className"];
  elementProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type ButtonSecondaryLinkProps = {
  element: "link";
  label: string;
  className?: HTMLProps<HTMLElement>["className"];
  elementProps?: LinkProps;
};

type ButtonSecondaryProps =
  | ButtonSecondaryButtonProps
  | ButtonSecondaryLinkProps;

export default function ButtonSecondary({
  element,
  label,
  className,
  elementProps,
}: ButtonSecondaryProps) {
  if (element === "link") {
    return (
      <Link
        {...elementProps}
        className={cn(
          `bg-gray-50 border-[0.2em] border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg whitespace-nowrap grow md:grow-0 text-center`,
          className
        )}
        href={elementProps?.href ?? ""}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      {...elementProps}
      className={cn(
        `bg-gray-50 border-[0.2em] border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg whitespace-nowrap grow md:grow-0 text-center`,
        className
      )}
    >
      {label}
    </button>
  );
}
