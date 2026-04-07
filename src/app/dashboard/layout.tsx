import { Sidebar } from "@/components/dashboard/sidebar";
import { prisma } from "@/lib/auth";
import { verifySession } from "@/lib/verify-session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();
  const user = session.user;

  const collections = await prisma.collection.findMany({
    where: { authorId: user.id },
    select: { id: true, title: true },
  });

  return (
    <div className="flex min-h-screen max-w-[1600px] mx-auto bg-background transition-colors duration-300">
      <Sidebar
        user={{ ...user, role: (user as { role?: string }).role || "Author" }}
        collections={collections}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 h-screen overflow-y-auto w-full relative">{children}</main>
      </div>
    </div>
  );
}
