"use client";

import {
  IconArchive as Archive,
  IconBook as BookOpen,
  IconFeather as Feather,
  IconFiles as Files,
  IconPlus as Plus,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Sidebar({
  user,
  collections,
}: {
  user: { name: string; email: string; image?: string | null; role: string };
  collections: { id: string; title: string }[];
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "All Entries", href: "/dashboard", icon: BookOpen },
    { name: "Collections", href: "/dashboard/collections", icon: Files },
    { name: "Drafts", href: "/dashboard/drafts", icon: Feather },
    { name: "Archive", href: "/dashboard/archive", icon: Archive },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 border-r border-border/10 py-8 px-6 overflow-y-auto">
      <div>
        <div className="mb-12">
          <Link href="/dashboard" className="flex flex-col">
            <span className="font-heading font-bold text-2xl tracking-tight text-primary">
              Kiroku
            </span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-muted-foreground mt-1">
              Author View
            </span>
          </Link>
        </div>

        <nav className="flex flex-col gap-2 mb-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${isActive ? "bg-secondary/10 text-secondary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                >
                  <item.icon className="size-4" strokeWidth={2} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mb-8">
          <h4 className="text-xs font-sans tracking-widest uppercase text-muted-foreground/60 mb-4 px-4">
            Collections
          </h4>
          <ul className="flex flex-col gap-3 px-4">
            {collections.map((c, i) => (
              <li
                key={c.id}
                className="flex items-center gap-3 text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <div
                  className={`size-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-amber-600/70"}`}
                />
                {c.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <Link className="block" href="/dashboard/new">
          <Button
            className="w-full rounded-full gap-2 font-semibold h-12 shadow-none bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            size="lg"
          >
            <Plus className="size-4 font-sans" />
            Write New
          </Button>
        </Link>

        <Link href="/dashboard/profile">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/40 transition-colors cursor-pointer ring-1 ring-border/20 bg-card">
            <Avatar className="size-10">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-heading font-medium">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-sans font-semibold text-foreground truncate">
                {user.name}
              </span>
              <span className="text-xs font-sans text-muted-foreground truncate">{user.role}</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
