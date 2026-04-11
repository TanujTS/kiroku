"use client";

import type { Editor } from "@tiptap/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserCollectionsAction } from "@/actions/collection";
import { createPostAction } from "@/actions/post";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { EditorToolbar } from "@/components/editor/editor-toolbar";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { cn } from "@/lib/utils";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collection, setCollection] = useState("none");
  const [tags, setTags] = useState(["Life", "Work"]);
  const [focusMode, setFocusMode] = useState(false);
  const [visibility, setVisibility] = useState<"private" | "unlisted" | "public">("private");
  const [isPublishing, setIsPublishing] = useState(false);
  const [dynamicCollections, setDynamicCollections] = useState<{ id: string; title: string }[]>([]);
  const [editor, setEditor] = useState<Editor | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserCollectionsAction().then((res) => {
      if (res.success && res.collections) {
        setDynamicCollections(res.collections);
        // Set default collection if there are collections and current is 'none'
        if (res.collections.length > 0) {
          setCollection((prev) => (prev === "none" ? res.collections![0].id : prev));
        }
      }
    });
  }, []);

  const handleEditorReady = useCallback((editorInstance: Editor | null) => {
    if (editorInstance) {
      setEditor(editorInstance);
    }
  }, []);

  const today = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Missing fields", {
        description: "Please provide both a title and content.",
      });
      return;
    }

    setIsPublishing(true);

    try {
      const result = await createPostAction({
        title,
        content,
        visibility,
        tags,
        ...(collection && collection !== "none" ? { collectionId: collection } : {}),
      });

      if (result.success) {
        toast.success("Entry published", {
          description: "Your reflection has been safely stored.",
        });
        router.push("/dashboard");
      } else {
        toast.error("Failed to publish", {
          description: result.error,
        });
      }
    } catch (_err) {
      toast.error("Network Error", {
        description: "Make sure your database is running.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Editor Canvas */}
      <div
        className={cn(
          "flex flex-1 px-6 pb-28 lg:px-10 transition-all duration-500",
          focusMode ? "pt-24 justify-center" : "pt-10",
        )}
      >
        {/* Main Writing Area */}
        <motion.div
          className="flex-1 max-w-3xl mx-auto lg:mx-0 lg:mr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title Input */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry Title"
              className="w-full bg-transparent font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/30 outline-none caret-secondary border-none pb-4"
            />
          </motion.div>

          {/* Status & Date */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-secondary">
              <span className="size-1.5 rounded-full bg-secondary" />
              Drafting..
            </span>
            <span className="text-xs text-muted-foreground/50 font-sans">/</span>
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-muted-foreground">
              {today}
            </span>
          </motion.div>

          {/* Content Area — Tiptap Editor */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiptapEditor
              content={content}
              onContentChange={setContent}
              onEditorReady={handleEditorReady}
            />
          </motion.div>
        </motion.div>

        {/* Right Sidebar Panel */}
        <AnimatePresence>
          {!focusMode && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <EditorSidebar
                visibility={visibility}
                onVisibilityChange={setVisibility}
                collection={collection}
                onCollectionChange={setCollection}
                tags={tags}
                onTagsChange={setTags}
                collections={dynamicCollections}
                onCollectionsChange={setDynamicCollections}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Toolbar */}
      <EditorToolbar
        editor={editor}
        focusMode={focusMode}
        onFocusModeChange={setFocusMode}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />
    </div>
  );
}
