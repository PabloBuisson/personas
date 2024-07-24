"use client";

import { cn } from "@/app/utils/utils";
import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, HTMLProps } from "react";
import { useFormStatus } from "react-dom";

type ButtonPrimaryButtonProps = {
  element: "button";
  label: string;
  className?: HTMLProps<HTMLElement>["className"];
  elementProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

type ButtonPrimaryLinkProps = {
  element: "link";
  label: string;
  className?: HTMLProps<HTMLElement>["className"];
  elementProps?: LinkProps;
};

type ButtonPrimaryProps = ButtonPrimaryButtonProps | ButtonPrimaryLinkProps;

export default function ButtonPrimary({
  element,
  label,
  className,
  elementProps,
}: ButtonPrimaryProps) {
  const { pending } = useFormStatus();

  if (element === "link") {
    return (
      <Link
        {...elementProps}
        className={cn(
          `bg-darkorange-500 hover:bg-darkorange-600 border-[0.2em] text-white border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg whitespace-nowrap grow md:grow-0 text-center`,
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
      disabled={pending}
      className={cn(
        `bg-darkorange-500 hover:bg-darkorange-600 border-[0.2em] text-white border-darkorange-500 px-[1.6em] py-[1.2em] rounded-lg whitespace-nowrap grow md:grow-0 text-center`,
        className
      )}
    >
      {label}
    </button>
  );
}
