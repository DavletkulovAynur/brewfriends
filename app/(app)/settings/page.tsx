import { ProfileEditor } from "@/components/features/profile/containers/profile-editor";
import { ThemeSetting } from "@/components/features/profile/components/theme-setting";

export default function SettingsPage() {
  return (
    <>
      <ProfileEditor />
      <ThemeSetting />
    </>
  );
}
