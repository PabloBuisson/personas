import ButtonPrimary from "@/components/buttons/ButtonPrimary";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 mt-24">
      <h1 className="text-5xl">Oops, we could not find the requested url</h1>
      <ButtonPrimary
        element="link"
        label="Return to the home page"
        elementProps={{ href: "/" }}
        additionalCSS="mt-8"
      />
    </section>
  );
}
