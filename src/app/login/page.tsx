import AuthLeftCanvas from "@/components/auth/auth-left-canvas";
import AuthForm from "@/components/auth/auth-form";
import Link from "next/link";

export const metadata = {
  title: "Sign In | Kiroku",
  description: "Enter your editorial sanctuary.",
};

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex flex-col lg:grid lg:grid-cols-2 bg-background">

      {/* Left Canvas - Branding & Waves (Client Component) */}
      <AuthLeftCanvas />

      {/* Right Canvas - Auth Form */}
      <div className="relative flex flex-col justify-between p-6 md:p-12 h-screen overflow-y-auto">
        <div className="lg:hidden mb-10 w-full flex justify-center">
          <Link href="/" className="text-secondary font-heading font-bold tracking-tight text-3xl hover:text-secondary/80 transition-colors">
            Kiroku
          </Link>
        </div>

        <AuthForm />

        {/* Footer Area */}
        <div className="flex flex-col items-center justify-center mt-12 space-y-8">
          <div className="text-center text-[10px] sm:text-xs font-bold tracking-widest text-muted-foreground/60 uppercase">
            © 2026 Kiroku.<br className="sm:hidden" /> Designed for the mindful observer.
          </div>
        </div>
      </div>

    </div>
  );
}
