"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createCollectionAction } from "@/actions/collection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateCollectionModal({
  children,
  onSuccess,
}: {
  children: React.ReactNode;
  onSuccess?: (collection: { id: string; title: string }) => void;
}) {
  const [open, setOpen] = useState(false);
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
      onSuccess?.(res.collection);
      setOpen(false);
      setNewCollectionTitle("");
      setNewCollectionDescription("");
    } else {
      toast.error(res.error || "Failed to create collection");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
  );
}
