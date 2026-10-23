import Image from "next/image";
import { cn } from "cn";

type PersonAvatarProps = {
    initial: string;
    avatarSrc?: string;
    size?: "sm" | "md" | "lg";
    imageSizes?: string;
    className?: string;
};

const sizeStyles = {
    sm: "size-9 border-2 border-white bg-zinc-100 text-sm text-zinc-800 shadow-sm dark:border-zinc-950 dark:bg-zinc-800 dark:text-zinc-100",
    md: "size-16 border-3 border-background bg-muted text-xl text-muted-foreground shadow-md",
    lg: "size-28 border-4 border-background bg-muted text-3xl text-muted-foreground shadow-md",
};

const imageSizes = {
    sm: "36px",
    md: "64px",
    lg: "112px",
};

export function PersonAvatar({
    initial,
    avatarSrc,
    size = "sm",
    imageSizes: customImageSizes,
    className,
}: PersonAvatarProps) {
    return (
        <div
            className={cn(
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
                sizeStyles[size],
                className,
            )}
        >
            {avatarSrc ? (
                <Image
                    src={avatarSrc}
                    alt=""
                    fill
                    unoptimized
                    sizes={customImageSizes ?? imageSizes[size]}
                    className="object-cover"
                />
            ) : (
                initial
            )}
        </div>
    );
}