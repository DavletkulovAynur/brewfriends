import { BottomNav } from "@/components/features/navigation/bottom-nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <main className="flex flex-1 flex-col pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
