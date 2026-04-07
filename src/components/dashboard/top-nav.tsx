"use client";

import {
  IconBell as Bell,
  IconSearch as Search,
  IconSettings as Settings,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const links = [
    { name: "Home", href: "/dashboard" },
    { name: "New Post", href: "/dashboard/new" },
  ];

  return (
    <header className="flex items-center justify-between py-6 px-10 border-b border-border/5">
      <nav className="flex items-center gap-8">
        {links.map((link) => {
          // A bit of hacky matching for home vs subpages exactly matching the image
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-sans font-medium hover:text-foreground transition-colors ${isActive ? "text-secondary border-b-2 border-secondary pb-1" : "text-muted-foreground pb-1 border-b-2 border-transparent"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search archive..."
            className="w-64 pl-10 bg-muted/30 border-transparent focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary rounded-full h-10 font-sans shadow-none"
          />
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Bell className="size-5" />
        </button>
        <Link
          href="/dashboard/profile"
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Settings className="size-5" />
        </Link>
        <Avatar className="size-8 cursor-pointer ring-1 ring-border/20 transition-opacity hover:opacity-80">
          <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
          <AvatarFallback className="bg-primary/10 text-primary font-heading font-bold text-xs">
            {user?.name?.substring(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
