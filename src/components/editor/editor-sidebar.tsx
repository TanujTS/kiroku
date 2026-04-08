"use client";

import { IconGlobe, IconLink, IconLock, IconPlus, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { createCollectionAction } from "@/actions/collection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  visibility: "private" | "unlisted" | "public";
  onVisibilityChange: (value: "private" | "unlisted" | "public") => void;
  collection: string;
  onCollectionChange: (value: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  collections?: { id: string; title: string }[];
  onCollectionsChange?: (collections: { id: string; title: string }[]) => void;
}

const TAG_COLORS: Record<string, string> = {
  Life: "bg-primary/20 text-secondary hover:bg-primary/30",
  Work: "bg-black/5 text-foreground hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20",
};

export function EditorSidebar({
  visibility,
  onVisibilityChange,
  collection,
  onCollectionChange,
  tags,
  onTagsChange,
  collections,
  onCollectionsChange,
}: EditorSidebarProps) {
  const [tagInput, setTagInput] = useState("");
  const [isTagPopoverOpen, setIsTagPopoverOpen] = useState(false);

  // Dialog State
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  const handleCreateCollection = async () => {
    if (!newCollectionTitle.trim()) return;
    setIsCreatingCollection(true);
    const res = await createCollectionAction({
      title: newCollectionTitle,
      description: newCollectionDescription,
    });
    setIsCreatingCollection(false);

    if (res.success && res.collection) {
      toast.success("Collection created");
      const newColList = [...(collections || []), res.collection];
      onCollectionsChange?.(newColList);
      onCollectionChange(res.collection.id);
      setIsCollectionDialogOpen(false);
      setNewCollectionTitle("");
      setNewCollectionDescription("");
    } else {
      toast.error(res.error || "Failed to create collection");
    }
  };

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
        {/* ── Visibility ── */}
        <motion.div
          className="rounded-3xl bg-muted p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-secondary mb-5">
            Visibility
          </h3>
          <div className="flex flex-col gap-4">
            <Select
              value={visibility}
              onValueChange={(val) => onVisibilityChange(val as "private" | "unlisted" | "public")}
            >
              <SelectTrigger className="w-full rounded-2xl bg-card border-none shadow-sm font-sans text-sm font-semibold h-11 text-foreground px-4">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-lg">
                <SelectItem value="private" className="font-sans font-medium">
                  <div className="flex items-center gap-2">
                    <IconLock className="size-4 text-muted-foreground" />
                    <span>Private</span>
                  </div>
                </SelectItem>
                <SelectItem value="unlisted" className="font-sans font-medium">
                  <div className="flex items-center gap-2">
                    <IconLink className="size-4 text-muted-foreground" />
                    <span>Unlisted</span>
                  </div>
                </SelectItem>
                <SelectItem value="public" className="font-sans font-medium">
                  <div className="flex items-center gap-2">
                    <IconGlobe className="size-4 text-muted-foreground" />
                    <span>Public</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-center font-sans text-muted-foreground">
              {visibility === "private" && "Only you can see this entry."}
              {visibility === "unlisted" && "Anyone with the link can view."}
              {visibility === "public" && "Visible on your public profile."}
            </p>
          </div>
        </motion.div>

        {/* ── Collection ── */}
        <motion.div
          className="rounded-3xl bg-muted p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-secondary">
              Collection
            </h3>
            <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <IconPlus className="size-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-3xl border border-border/40 shadow-2xl p-8 bg-card">
                <DialogHeader>
                  <DialogTitle className="font-heading font-bold text-2xl mb-2 text-foreground">
                    New Collection
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                      Title
                    </label>
                    <Input
                      value={newCollectionTitle}
                      onChange={(e) => setNewCollectionTitle(e.target.value)}
                      placeholder="e.g. Journey Log"
                      className="font-sans rounded-xl h-11 bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
                      Description (Optional)
                    </label>
                    <Input
                      value={newCollectionDescription}
                      onChange={(e) => setNewCollectionDescription(e.target.value)}
                      placeholder="A short description..."
                      className="font-sans rounded-xl h-11 bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleCreateCollection}
                    disabled={isCreatingCollection || !newCollectionTitle.trim()}
                    className="rounded-full font-sans font-semibold px-6 shadow-none"
                  >
                    {isCreatingCollection ? "Creating..." : "Create Collection"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Select value={collection} onValueChange={onCollectionChange}>
            <SelectTrigger className="w-full rounded-2xl bg-card border-none shadow-sm font-sans text-sm font-semibold h-11 text-foreground px-4">
              <SelectValue placeholder="Choose a collection" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-lg">
              {collections?.length ? (
                collections.map((col) => (
                  <SelectItem key={col.id} value={col.id} className="font-sans font-medium">
                    {col.title}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-4 text-center text-sm font-sans text-muted-foreground">
                  No collections yet.
                </div>
              )}
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
