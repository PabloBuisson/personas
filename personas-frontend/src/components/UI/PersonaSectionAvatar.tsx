import InputEmoji from "../forms/common/InputEmoji";
import AppIcon from "./AppIcon";

export default function PersonaSectionAvatar({
  image,
  mode,
}: {
  image: string | undefined;
  mode: "edit" | "view";
}) {
  if (mode === "edit") {
    return (
      <>
        <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center z-10">
          <InputEmoji name="icon" value={image} />
        </div>
        <div className="flex gap-4 justify-between mb-8">
          <button
            type="button"
            className="text-4xl bg-orange-25 py-2 px-3 rounded text-darkorange-600 flex justify-center"
            aria-label="Change avatar"
          >
            <AppIcon icon="mdi:face-man-outline" />
          </button>
          <button
            type="button"
            className="text-4xl bg-purple-25 py-2 px-3 rounded text-purple-600 flex justify-center items-center"
            aria-label="Change theme color"
          >
            <AppIcon icon="mdi:palette-outline" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center">
        {image && (
          <span className="text-6xl" role="image">
            {image}
          </span>
        )}
      </div>
      <div className="flex gap-4 justify-between mb-8">
        <button
          type="button"
          className="text-4xl bg-orange-25 py-2 px-3 rounded text-darkorange-600 flex justify-center"
          aria-label="Change avatar"
        >
          <AppIcon icon="mdi:face-man-outline" />
        </button>
        <button
          type="button"
          className="text-4xl bg-purple-25 py-2 px-3 rounded text-purple-600 flex justify-center items-center"
          aria-label="Change theme color"
        >
          <AppIcon icon="mdi:palette-outline" />
        </button>
      </div>
    </>
  );
}
