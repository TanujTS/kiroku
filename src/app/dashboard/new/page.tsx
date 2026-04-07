"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TopNav } from "@/components/dashboard/top-nav";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { EditorToolbar } from "@/components/editor/editor-toolbar";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [collection, setCollection] = useState("daily-reflections");
  const [tags, setTags] = useState(["Life", "Work"]);

  const today = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />

      {/* Editor Canvas */}
      <div className="flex flex-1 px-6 pt-10 pb-28 lg:px-10">
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
              Drafting
            </span>
            <span className="text-xs text-muted-foreground/50 font-sans">/</span>
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-muted-foreground">
              {today}
            </span>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin your reflection..."
              className="w-full min-h-[50vh] bg-transparent font-serif text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/50 outline-none border-none resize-none caret-secondary"
            />
          </motion.div>
        </motion.div>

        {/* Right Sidebar Panel */}
        <EditorSidebar
          visibility={visibility}
          onVisibilityChange={setVisibility}
          collection={collection}
          onCollectionChange={setCollection}
          tags={tags}
          onTagsChange={setTags}
        />
      </div>

      {/* Floating Bottom Toolbar */}
      <EditorToolbar />
    </div>
  );
}
