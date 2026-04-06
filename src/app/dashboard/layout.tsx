import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen max-w-[1600px] mx-auto bg-background transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 h-screen overflow-y-auto w-full relative">{children}</main>
      </div>
    </div>
  );
}
