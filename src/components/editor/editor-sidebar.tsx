"use client";

import { IconPlus, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface EditorSidebarProps {
  collection: string;
  onCollectionChange: (value: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TAG_COLORS: Record<string, string> = {
  Life: "bg-primary/20 text-secondary hover:bg-primary/30",
  Work: "bg-black/5 text-foreground hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20",
};

export function EditorSidebar({
  collection,
  onCollectionChange,
  tags,
  onTagsChange,
}: EditorSidebarProps) {
  const [tagInput, setTagInput] = useState("");
  const [isTagPopoverOpen, setIsTagPopoverOpen] = useState(false);

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
    }
    setTagInput("");
    setIsTagPopoverOpen(false);
  };

  return (
    <motion.aside
      className="hidden lg:block w-72 xl:w-80 flex-shrink-0 pt-2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="sticky top-28 flex flex-col gap-8">
        {/* ── Collection ── */}
        <motion.div
          className="rounded-3xl bg-muted p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-secondary mb-5">
            Collection
          </h3>

          <Select value={collection} onValueChange={onCollectionChange}>
            <SelectTrigger className="w-full rounded-2xl bg-card border-none shadow-sm font-sans text-sm font-semibold h-11 text-foreground px-4">
              <SelectValue placeholder="Choose a collection" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-lg">
              <SelectItem value="daily-reflections" className="font-sans font-medium">
                Daily Reflections
              </SelectItem>
              <SelectItem value="night-thoughts" className="font-sans font-medium">
                Night Thoughts
              </SelectItem>
              <SelectItem value="dev-log" className="font-sans font-medium">
                Dev Log
              </SelectItem>
              <SelectItem value="essays" className="font-sans font-medium">
                Essays
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest cursor-default border-none shadow-none",
                    TAG_COLORS[tag] ?? "bg-black/5 text-foreground dark:bg-white/10",
                  )}
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center -mr-1"
                  >
                    <IconX className="size-2.5" />
                  </button>
                </Badge>
              </motion.div>
            ))}
            <Popover open={isTagPopoverOpen} onOpenChange={setIsTagPopoverOpen}>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground border border-dashed border-muted-foreground/40 hover:bg-muted-foreground/10 transition-colors cursor-pointer shadow-none">
                  <IconPlus className="size-3" />
                  Tag
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 rounded-2xl p-3 border-none shadow-xl"
                side="bottom"
                align="start"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-widest">
                    New Tag
                  </p>
                  <Input
                    autoFocus
                    placeholder="e.g. Ideas"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTag();
                    }}
                    className="font-sans text-sm rounded-xl"
                  />
                  <Button
                    size="sm"
                    onClick={handleAddTag}
                    className="rounded-xl font-sans font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full mt-1"
                  >
                    Add Tag
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
