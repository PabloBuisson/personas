import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function Tag({
  id,
  name,
  size,
  link,
}: {
  id: any;
  name: string;
  size: "text-sm" | "text-base" | "text-lg";
  link?: Url;
}) {
  if (link) {
    return (
      <li
        className={`bg-gray-50 border-[0.15em] border-gray-300 rounded-lg font-medium ${size}`}
        key={id}
      >
        <Link className="block px-[1em] py-[0.3em]" href={link}>
          {name}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`bg-gray-50 border-[0.1em] border-gray-300 px-[1em] py-[0.3em] rounded-lg font-medium ${size}`}
      key={id}
    >
      {name}
    </li>
  );
}
