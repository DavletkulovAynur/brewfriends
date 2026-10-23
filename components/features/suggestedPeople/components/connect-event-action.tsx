import { Button } from "@/components/ui/button";

type ConnectEventActionProps = {
    isConnected: boolean;
    isPending: boolean;
    onChange: (connected: boolean) => void;
};

export function ConnectEventAction({ isConnected, isPending, onChange }: ConnectEventActionProps) {
    return (
        <Button
            variant="secondary"
            type="button"
            className="mt-4 h-11 px-8"
            loading={isPending}
            onClick={() => onChange(!isConnected)}
        >
            {isConnected ? "Отмена" : "Присоединиться"}
        </Button>
    );
}
