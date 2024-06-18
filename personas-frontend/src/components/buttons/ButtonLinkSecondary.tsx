import Link, { LinkProps } from "next/link";

interface ButtonLinkSecondaryProps {
  label: string;
  url: string;
  additionalCSS?: string;
}

export default function ButtonLinkSecondary({
  label,
  url,
  additionalCSS,
  ...props
}: ButtonLinkSecondaryProps & LinkProps) {
  let finalCSS = `bg-gray-50 border-[0.2em] border-gray-300 px-[1.6em] py-[1.2em] rounded-lg ${
    additionalCSS ?? ""
  }`;

  return (
    <Link {...props} className={finalCSS} href={url}>
      {label}
    </Link>
  );
}
