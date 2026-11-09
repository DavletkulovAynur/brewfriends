import { InterestsList } from "@/components/features/interests/components/interests-list";

export default function MyInterestsPage() {
    return (
        <div className="flex flex-1 flex-col gap-5 pt-4">
            <div className="px-6">
                <InterestsList />
            </div>
        </div>
    );
}