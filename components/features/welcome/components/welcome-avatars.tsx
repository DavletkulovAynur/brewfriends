import Image from "next/image";

const avatars = [
    { id: 47, color: "#ef9678", offset: "translate-y-1" },
    { id: 12, color: "#e8a7a5", offset: "translate-y-4" },
    { id: 44, color: "#a4b396", offset: "translate-y-0" },
    { id: 33, color: "#e6a47b", offset: "translate-y-4" },
    { id: 25, color: "#edbf71", offset: "translate-y-1" },
];

export function WelcomeAvatars() {
    return (
        <div aria-hidden="true" className="mx-auto mb-4 flex w-full max-w-[360px] items-center justify-between gap-2 pt-4">
            {avatars.map((avatar) => (
                <div
                    key={avatar.id}
                    className={`relative size-12 shrink-0 overflow-hidden rounded-full sm:size-14 ${avatar.offset}`}
                    style={{ backgroundColor: avatar.color }}
                >
                    <Image
                        src={`https://api.dicebear.com/9.x/notionists/png?seed=${avatar.id}&size=112`}
                        alt=""
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}