/** biome-ignore-all lint/a11y/noLabelWithoutControl: WIP */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Content Canvas */}
      <div className="flex-1 p-10 lg:px-14 max-w-4xl pt-16">
        <h1 className="text-4xl font-heading font-extrabold tracking-tighter text-foreground mb-4">
          Author <span className="text-primary">Identity</span>
        </h1>
        <p className="text-base text-muted-foreground font-sans leading-relaxed mb-12">
          Manage your name, digital footprint, and blog preferences.
        </p>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6">
            <Avatar className="size-32 ring-1 ring-border shadow-sm">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-heading font-bold text-4xl">
                {user.name?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="rounded-full shadow-none font-sans font-medium hover:bg-muted text-xs"
            >
              Upload Profile Picture
            </Button>
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-10 w-full">
            {/* General Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-bold text-foreground">General Info</h3>
              <Separator className="bg-border/40" />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                    Name
                  </label>
                  <Input
                    defaultValue={user.name}
                    className="h-12 bg-transparent border-border/60 focus-visible:border-secondary shadow-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                    Role Tagline
                  </label>
                  <Input
                    defaultValue={user.role || "Author"}
                    className="h-12 bg-transparent border-border/60 focus-visible:border-secondary shadow-none rounded-xl"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                    Recovery Email
                  </label>
                  <Input
                    defaultValue={user.email}
                    type="email"
                    className="h-12 bg-transparent border-border/60 focus-visible:border-secondary shadow-none rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-6 pt-6">
              <h3 className="text-lg font-heading font-bold text-destructive">Danger Zone</h3>
              <Separator className="bg-destructive/20" />

              <div className="border border-destructive/20 rounded-2xl p-6 bg-destructive/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-sans font-bold text-foreground mb-1">Delete Account</h4>
                  <p className="text-sm font-sans text-muted-foreground line-clamp-2">
                    Permanently delete your entire account, posts, and settings. This cannot be
                    undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="rounded-full shadow-none font-sans whitespace-nowrap shrink-0"
                >
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-6 flex justify-end gap-4">
              <Button
                variant="ghost"
                className="rounded-full font-sans shadow-none hover:bg-muted font-semibold h-12 px-6 text-muted-foreground"
              >
                Cancel
              </Button>
              <Button className="rounded-full font-sans shadow-none bg-foreground text-background hover:bg-foreground/90 font-semibold h-12 px-8">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
