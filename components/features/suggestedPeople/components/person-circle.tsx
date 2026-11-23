import { PersonAvatar } from "@/common/people/components/person-avatar";
import type { MeetupIntent } from "@/domain/users/meetup-intent";
import { MEETUP_INTENT_EMOJIS } from "@/domain/users/meetup-intent";
import { MEETUP_INTENT_COLORS, MEETUP_INTENT_SHORT_LABELS } from "@/common/people/constants/meetup-intent-colors";

type PersonCircleProps = {
  name: string;
  status?: string;
  initial: string;
  avatarSrc?: string;
  meetupIntent: MeetupIntent;
  onClick?: () => void;
};

export function PersonCircle({
  name,
  status,
  initial,
  avatarSrc,
  meetupIntent,
  onClick,
}: PersonCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[76px] shrink-0 flex-col items-center gap-2"
    >
      <div className="relative h-[100px] w-[72px] rounded-full bg-zinc-300 p-[2px] dark:bg-zinc-700">
        <div
          className="relative flex h-full w-full items-start justify-center overflow-hidden rounded-full pt-4 text-3xl"
          aria-label={MEETUP_INTENT_SHORT_LABELS[meetupIntent]}
          title={MEETUP_INTENT_SHORT_LABELS[meetupIntent]}
          style={{ backgroundColor: MEETUP_INTENT_COLORS[meetupIntent] }}
        >
          <span aria-hidden="true">{MEETUP_INTENT_EMOJIS[meetupIntent]}</span>
        </div>
        <PersonAvatar
          initial={initial}
          avatarSrc={avatarSrc}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4"
        />
      </div>

      <div className="w-full text-center">
        <p className="truncate text-xs font-medium">{name}</p>
        <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
          {MEETUP_INTENT_SHORT_LABELS[meetupIntent]}
        </p>
        {status ? (
          <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
            {status}
          </p>
        ) : null}
      </div>
    </button>
  );
}