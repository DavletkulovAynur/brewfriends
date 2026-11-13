import { Button } from "@/components/ui/button";

type ConnectEventActionProps = {
    isConnected: boolean;
    isPending: boolean;
    onChange: (connected: boolean) => void;
    className?: string;
};

export function ConnectEventAction({ isConnected, isPending, onChange, className }: ConnectEventActionProps) {
    return (
        <>
            {isConnected ? (
                <div className="mt-4 bg-white p-4 rounded-lg">
                    <p className="text-sm font-serif leading-relaxed text-[#1f4557]">
                        Вы записаны на это событие. Если ваши планы изменятся, вы всегда можете{" "}
                        <button
                            type="button"
                            className="underline hover:opacity-80 cursor-pointer disabled:opacity-50"
                            disabled={isPending}
                            onClick={() => onChange(false)}
                        >
                            отменить участие
                        </button>
                        .
                    </p>
                </div>


            ) : (
                <Button
                    variant="secondary"
                    type="button"
                    className={`mt-4 h-11 px-8 ${className ?? ""}`}
                    loading={isPending}
                    onClick={() => onChange(true)}
                >
                    Присоединиться
                </Button>
            )}
        </>
    );
}
