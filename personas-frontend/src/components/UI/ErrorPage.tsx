"use client";

import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  function resetAndRefresh() {
    // will wait until the two methods are done to activate them at the same time
    startTransition(() => {
      // reset client components
      reset();
      // reset server components
      router.refresh();
    });
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 mt-24">
      <h1 className="text-5xl">Oops, something went wrong !</h1>
      {error.message && <p>Error: {error.message}</p>}
      <ButtonPrimary
        element="button"
        label="Try again"
        elementProps={{ onClick: resetAndRefresh }}
        additionalCSS="mt-8"
      />
    </section>
  );
}