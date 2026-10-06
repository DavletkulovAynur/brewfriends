import Image from "next/image";

type ProfileStoryCircleProps = {
  name: string;
  status?: string;
  initial: string;
  coverSrc: string;
  onClick?: () => void;
};

export function ProfileStoryCircle({
  name,
  status,
  initial,
  coverSrc,
  onClick,
}: ProfileStoryCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[76px] shrink-0 flex-col items-center gap-2"
    >
      <div className="relative h-[100px] w-[72px] rounded-full bg-zinc-300 p-[2px] dark:bg-zinc-700">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <Image
            src={coverSrc}
            alt=""
            fill
            unoptimized
            sizes="72px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/35 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-1/2 flex size-9 -translate-x-1/2 translate-y-1/4 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-sm font-semibold text-zinc-800 shadow-sm dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-100">
          {initial}
        </div>
      </div>

      <div className="w-full text-center">
        <p className="truncate text-xs font-medium">{name}</p>
        {status ? (
          <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
            {status}
          </p>
        ) : null}
      </div>
    </button>
  );
}