import { Heart, Plus } from "lucide-react";
import { SettingsLinks } from "@/components/shared/settings-links";

export function InterestsSettingsLink() {
    return (
        <SettingsLinks
            items={[
                { href: "/interests/create", label: "Создать интерес", icon: Plus },
                { href: "/interests", label: "Мои интересы", icon: Heart },
            ]}
            description="Расскажи, чем хочешь заниматься: найдёшь компанию или поделишься опытом."
        />
    );
}