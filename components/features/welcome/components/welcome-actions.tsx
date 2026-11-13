import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type WelcomeActionsProps = {
    acceptedTerms: boolean;
    onAcceptedTermsChange: (accepted: boolean) => void;
    onContinue: () => void;
};

export function WelcomeActions({
    acceptedTerms,
    onAcceptedTermsChange,
    onContinue,
}: WelcomeActionsProps) {
    return (
        <div className="pt-8">
            <div className="flex justify-center">
                <Button
                    type="button"
                    disabled={!acceptedTerms}
                    onClick={onContinue}
                    size="xl"
                    className="w-[90%]"
                >
                    Найти своих
                </Button>
            </div>

            <div className="mx-auto flex w-fit max-w-full flex-col items-center gap-1 py-5">
                <div className="flex items-center gap-3 text-[14px] leading-5 text-[#59635c]">
                    <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => onAcceptedTermsChange(checked === true)}
                        className="border-[#7c877d]"
                    />
                    <label htmlFor="terms" className="cursor-pointer">
                        Подтверждаю согласие
                    </label>
                </div>
                <Link
                    href="/terms"
                    className="text-center text-[14px] leading-5 text-[#1e493b] underline underline-offset-2"
                >
                    с условиями использования Brewfriends.
                </Link>
            </div>
        </div>
    );
}