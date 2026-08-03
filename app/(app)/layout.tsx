import { BottomNav } from "@/components/features/navigation/bottom-nav";
import { TelegramAuthProvider } from "@/components/providers/telegram-auth-provider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TelegramAuthProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <main className="flex flex-1 flex-col pb-24">{children}</main>
        <BottomNav />
      </div>
    </TelegramAuthProvider>
  );
}
