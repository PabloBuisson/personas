import Link from "next/link";
import AppIcon from "../UI/AppIcon";

export default function CreateProjectCard({ id }: { id: any }) {
  const cardContent = (
    <>
      <div className="absolute flex justify-center items-center top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-purple-25 w-16 h-16 rounded-full border-[0.125em] border-purple-200">
        <div aria-hidden className="text-2xl text-purple-200">
          ?
        </div>
      </div>
      <div className="flex flex-col grow justify-center items-center gap-2">
        <AppIcon
          icon="mdi:plus"
          className="text-4xl font-semibold text-white"
        />
        <h2 className="text-xl font-bold">Create a project</h2>
      </div>
      <div className="-z-50 absolute top-[-0.5rem] left-[-0.5rem] w-[calc(100%+1rem)] h-[calc(100%+1rem)] bg-purple-200 [clip-path:polygon(2rem_0%,_calc(100%-2rem)_0%,_100%_2rem,_100%_calc(100%-2rem),_calc(100%-2rem)_100%,_2rem_100%,_0%_calc(100%-2rem),_0%_2rem)] noisy-background"></div>
    </>
  );

  return (
    <li
      className="text-base font-medium flex flex-col justify-center gap-4"
      key={id}
    >
      <article className="flex justify-center items-center text-purple-800 border-[0.15em] border-white relative">
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-45"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-45"></div>
        <Link
          className="relative p-1 flex flex-col grow min-h-[30ch] min-w-[30ch]"
          href={`/projects/new`}
        >
          {cardContent}
        </Link>
      </article>
    </li>
  );
}
