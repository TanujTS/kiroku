import { BentoGrid } from "@/components/dashboard/bento-grid";
import { TopNav } from "@/components/dashboard/top-nav";

export default function DashboardPage() {
  return (
    <div className="min-h-full flex flex-col">
      <TopNav />
      {/* Content Canvas */}
      <div className="flex-1 p-10 lg:px-14 pb-20">
        {/* Hero Section */}
        <div className="flex items-start justify-between mb-16">
          <div className="max-w-xl">
            {/* The PRD specifies display fonts to break the rhythm. We use font-heading here. */}
            <h1 className="text-6xl font-heading font-extrabold tracking-tighter text-foreground mb-6">
              Your <span className="text-primary">Archive</span>
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              Welcome to your sanctuary. Here lies the collective weight of your thoughts, organized
              for quiet reflection and curated growth.
            </p>
          </div>

          {/* Stats Chips */}
          <div className="flex gap-6 mt-4">
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-card shadow-sm ring-1 ring-border/10">
              <span className="text-3xl font-heading font-bold text-secondary">42</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mt-1">
                Entries
              </span>
            </div>
            <div className="flex flex-col items-center justify-center size-24 rounded-full bg-card shadow-sm ring-1 ring-border/10">
              <span className="text-3xl font-heading font-bold text-amber-600/80">12</span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mt-1">
                Drafts
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Post Grid */}
        <BentoGrid />

        {/* Minimal Footer Inside Dashboard */}
        <div className="mt-24 pt-10 border-t border-border/10 flex flex-col items-center justify-center opacity-60">
          <span className="font-heading font-bold text-lg text-foreground mb-4">Kiroku</span>
          <div className="flex gap-6 uppercase text-[10px] font-sans tracking-widest font-bold text-muted-foreground mb-6">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">About</span>
          </div>
          <span className="text-[10px] font-sans text-muted-foreground/60 tracking-wider">
            &copy; 2024 KIROKU. THE EDITORIAL SANCTUARY.
          </span>
        </div>
      </div>
    </div>
  );
}
