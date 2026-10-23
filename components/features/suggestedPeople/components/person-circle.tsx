import Image from "next/image";
import { PersonAvatar } from "@/common/people/components/person-avatar";

type PersonCircleProps = {
  name: string;
  status?: string;
  initial: string;
  avatarSrc?: string;
  onClick?: () => void;
};

export function PersonCircle({
  name,
  status,
  initial,
  avatarSrc,
  onClick,
}: PersonCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[76px] shrink-0 flex-col items-center gap-2"
    >
      <div className="relative h-[100px] w-[72px] rounded-full bg-zinc-300 p-[2px] dark:bg-zinc-700">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <Image
            src="/cover_user.jpg"
            alt=""
            fill
            sizes="72px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/35 to-transparent" />
        </div>
        <PersonAvatar
          initial={initial}
          avatarSrc={avatarSrc}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4"
        />
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