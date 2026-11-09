import { InterestCreateForm } from "@/components/features/interests/containers/interest-create-form";

export default function CreateInterestPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 pt-4">
            <InterestCreateForm />
        </div>
    );
}