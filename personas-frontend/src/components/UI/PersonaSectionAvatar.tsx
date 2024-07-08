export default function PersonaSectionAvatar({ image }: { image: string | undefined }) {
  return (
    <>
      <div className="bg-white rounded-full w-36 h-36 flex justify-center items-center">
        {image && (
          <span className="text-6xl" role="image">
            {image}
          </span>
        )}
      </div>
      <div className="flex gap-4 justify-between mb-8">
        <button
          type="button"
          className="text-3xl bg-orange-25 p-2 rounded"
          aria-label="Change avatar"
        >
          😎
        </button>
        <button
          type="button"
          className="text-3xl bg-purple-25 p-2 rounded"
          aria-label="Change theme color"
        >
          🎨
        </button>
      </div>
    </>
  );
}
