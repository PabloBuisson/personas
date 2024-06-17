import Link from "next/link";

export default function ButtonSecondary({
  label,
  url,
  callback,
  additionalCSS,
}: {
  label: string;
  url: string;
  callback?: () => {};
  additionalCSS?: string;
}) {
  let finalCSS = `bg-gray-50 border-[0.2em] border-gray-300 px-[1.6em] py-[1.2em] rounded-lg ${
    additionalCSS ?? ""
  }`;

  if (url) {
    return (
      <Link className={finalCSS} href={url}>
        {label}
      </Link>
    );
  }

  return (
    <button className={finalCSS} onClick={callback}>
      {label}
    </button>
  );
}
