"use client";

import { IconDeviceDesktop, IconLock, IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import { cn } from "@/lib/utils";

interface SettingsContentProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: string;
  };
}

const themeOptions = [
  { value: "light", icon: IconSun, label: "Light" },
  { value: "dark", icon: IconMoon, label: "Dark" },
  { value: "system", icon: IconDeviceDesktop, label: "System" },
] as const;

export function SettingsContent({ user }: SettingsContentProps) {
  const { theme, setThemeWithTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  // Privacy toggles
  const [safeSpaceMode, setSafeSpaceMode] = useState(true);
  const [searchIndexing, setSearchIndexing] = useState(false);
  const [readingAnalytics, setReadingAnalytics] = useState(true);

  useEffect(() => setMounted(true), []);

  return (
    <div className="space-y-16 pb-12">
      {/* ─── Account ─── */}
      <section id="account">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Account
          </h2>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
            Personal Profile
          </span>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card p-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                Display Name
              </label>
              <Input
                defaultValue={user.name}
                className="h-12 bg-transparent border-border/60 focus-visible:border-secondary shadow-none rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                Email Address
              </label>
              <Input
                defaultValue={user.email}
                type="email"
                className="h-12 bg-transparent border-border/60 focus-visible:border-secondary shadow-none rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
              Short Biography
            </label>
            <textarea
              defaultValue="Find significance in the notes. Keeper of quiet moments."
              className="w-full min-h-[100px] bg-transparent border border-border/60 focus-visible:border-secondary shadow-none rounded-xl py-3 px-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>

      {/* ─── Privacy ─── */}
      <section id="privacy">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Privacy
          </h2>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
            Customize
          </span>
        </div>

        <div className="space-y-6">
          {/* Safe Space Mode — Featured Card */}
          <div className="rounded-3xl border border-border/40 bg-card p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-sans font-bold text-foreground">Safe Space Mode</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-lg">
                  When active, entries are encrypted with an additional blanket layer, and hidden
                  from search providers. A sanctuary within the sanctuary.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Switch checked={safeSpaceMode} onCheckedChange={setSafeSpaceMode} />
                  <span className="text-xs font-sans font-semibold text-secondary uppercase tracking-widest">
                    {safeSpaceMode ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Decorative Icon Block */}
              <div className="hidden sm:flex flex-col items-center justify-center size-28 rounded-2xl bg-secondary text-secondary-foreground shrink-0">
                <IconLock className="size-8 mb-2" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-center leading-tight opacity-80">
                  Not all your thoughts
                  <br />
                  are for the world.
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Row Items */}
          <div className="rounded-3xl border border-border/40 bg-card divide-y divide-border/30">
            <div className="flex items-center justify-between p-6">
              <div>
                <h4 className="font-sans font-bold text-foreground mb-1">Search Indexing</h4>
                <p className="text-sm font-sans text-muted-foreground">
                  Allow your posts to be findable via search engines.
                </p>
              </div>
              <Switch checked={searchIndexing} onCheckedChange={setSearchIndexing} />
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <h4 className="font-sans font-bold text-foreground mb-1">Reading Analytics</h4>
                <p className="text-sm font-sans text-muted-foreground">
                  Track who, how & when people read your entries.
                </p>
              </div>
              <Switch checked={readingAnalytics} onCheckedChange={setReadingAnalytics} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Preferences ─── */}
      <section id="preferences">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Preferences
          </h2>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
            Customize
          </span>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card p-8 space-y-10">
          {/* Visual Theme */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Visual Theme
            </h4>
            <div className="flex gap-4">
              {mounted
                ? themeOptions.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={(e) => setThemeWithTransition(value, e)}
                      className={cn("flex flex-col items-center gap-3 group")}
                    >
                      <div
                        className={cn(
                          "size-16 rounded-full flex items-center justify-center transition-all duration-200 border-2",
                          theme === value
                            ? "bg-secondary text-secondary-foreground border-secondary shadow-md"
                            : "bg-muted text-muted-foreground border-transparent hover:border-border",
                        )}
                      >
                        <Icon className="size-6" />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-sans font-semibold uppercase tracking-widest transition-colors",
                          theme === value ? "text-secondary" : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  ))
                : /* Skeleton placeholders */
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="size-16 rounded-full bg-muted animate-pulse" />
                      <div className="h-3 w-12 rounded bg-muted animate-pulse" />
                    </div>
                  ))}
            </div>
          </div>

          <Separator className="bg-border/30" />

          {/* Typography Size */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Typography Size
            </h4>
            <div className="flex items-center gap-6">
              <span className="text-sm font-sans text-muted-foreground">A</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted relative">
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 size-4 rounded-full bg-secondary border-2 border-background shadow-sm cursor-pointer" />
              </div>
              <span className="text-lg font-sans font-bold text-muted-foreground">A</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Security ─── */}
      <section id="security">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Security
          </h2>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
            Protection
          </span>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card divide-y divide-border/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
            <div>
              <h4 className="font-sans font-bold text-foreground mb-1">Change Password</h4>
              <p className="text-sm font-sans text-muted-foreground">
                Update your account password for increased protection.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full shadow-none font-sans font-semibold text-xs shrink-0"
            >
              Update Password
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4">
            <div>
              <h4 className="font-sans font-bold text-foreground mb-1">
                Two-Factor Authentication
              </h4>
              <p className="text-sm font-sans text-muted-foreground">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full shadow-none font-sans font-semibold text-xs shrink-0"
            >
              Enable 2FA
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Notifications ─── */}
      <section id="notifications">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            Notifications
          </h2>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground">
            Alerts
          </span>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card divide-y divide-border/30">
          <div className="flex items-center justify-between p-6">
            <div>
              <h4 className="font-sans font-bold text-foreground mb-1">Email Notifications</h4>
              <p className="text-sm font-sans text-muted-foreground">
                Get notified about new readers and engagement.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-6">
            <div>
              <h4 className="font-sans font-bold text-foreground mb-1">Weekly Digest</h4>
              <p className="text-sm font-sans text-muted-foreground">
                Receive a summary of your activity each week.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </section>

      {/* ─── Action Buttons ─── */}
      <div className="flex justify-center gap-4 pt-4">
        <Button className="rounded-full font-sans shadow-none bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-12 px-10">
          Save Changes
        </Button>
        <Button
          variant="outline"
          className="rounded-full font-sans shadow-none hover:bg-muted font-semibold h-12 px-10 border-border/60"
        >
          Discard Changes
        </Button>
      </div>
    </div>
  );
}
