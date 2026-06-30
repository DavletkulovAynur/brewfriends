import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CafeStoryCircleProps = {
  name: string;
  subtitle?: string;
  initial: string;
  isLive?: boolean;
  isAdd?: boolean;
  onClick?: () => void;
};

export function CafeStoryCircle({
  name,
  subtitle,
  initial,
  isLive = false,
  isAdd = false,
  onClick,
}: CafeStoryCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
    >
      <div
        className={cn(
          "rounded-full p-[2.5px]",
          isLive &&
            "bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500",
          isAdd &&
            !isLive &&
            "border-2 border-dashed border-zinc-300 dark:border-zinc-600",
          !isLive && !isAdd && "bg-zinc-200 dark:bg-zinc-700",
        )}
      >
        <div
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-white dark:bg-zinc-950",
            isAdd && !isLive && "bg-zinc-50 dark:bg-zinc-900",
          )}
        >
          {isAdd && !isLive ? (
            <Plus className="size-5 text-zinc-500 dark:text-zinc-400" />
          ) : (
            <span className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
              {initial}
            </span>
          )}
        </div>
      </div>

      <div className="w-full text-center">
        <p className="truncate text-xs font-medium">{name}</p>
        {subtitle ? (
          <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        ) : null}
      </div>
    </button>
  );
}
