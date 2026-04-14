"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface DashboardToolbarProps {
  availableTags: string[];
}

export function DashboardToolbar({ availableTags }: DashboardToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") || "";
  const currentTag = searchParams.get("tag") || "";

  const [searchValue, setSearchValue] = useState(currentQuery);

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("q", searchValue);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchValue, router, searchParams]);

  const toggleTag = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (currentTag === tag) {
        params.delete("tag");
      } else {
        params.set("tag", tag);
      }
      router.push(`?${params.toString()}`);
    },
    [currentTag, router, searchParams],
  );

  return (
    <div className="flex flex-col gap-6 mb-8 w-full max-w-4xl">
      <div className="relative group">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <Input
          placeholder="Search by title or content..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-12 h-14 rounded-3xl bg-card border-0 shadow-sm font-sans text-base focus-visible:ring-1 focus-visible:ring-border/40 focus-visible:bg-secondary/5 transition-all"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconX className="size-4" />
          </button>
        )}
      </div>

      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground mr-2 shrink-0">
            Filters
          </span>
          {availableTags.map((tag) => {
            const isActive = currentTag === tag;
            return (
              <Badge
                key={tag}
                onClick={() => toggleTag(tag)}
                variant={isActive ? "default" : "secondary"}
                className={`cursor-pointer transition-all shrink-0 font-sans px-4 py-1.5 ${
                  isActive
                    ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted font-medium hover:text-foreground hover:shadow-sm ring-1 ring-border/20"
                }`}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
