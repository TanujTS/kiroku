import { SettingsContent } from "@/components/dashboard/settings-content";
import { verifySession } from "@/lib/verify-session";

export default async function ProfilePage() {
  const session = await verifySession();
  const user = session.user as {
    name: string;
    email: string;
    image?: string | null;
    role?: string;
  };

  return (
    <div className="min-h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-10 lg:px-14 pb-20 pt-16">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            Customize your reflective environment and manage your digital legacy with intention.
          </p>
        </div>

        {/* Settings Content (includes nav) */}
        <SettingsContent user={user} />
      </div>
    </div>
  );
}
