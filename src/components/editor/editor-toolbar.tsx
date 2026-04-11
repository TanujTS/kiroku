"use client";

import {
  IconArrowRight,
  IconBlockquote,
  IconBold,
  IconCheck,
  IconH1,
  IconH2,
  IconH3,
  IconHeading,
  IconItalic,
  IconLink,
  IconList,
  IconLoader2,
  IconMaximize,
  IconMinimize,
  IconX,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function ToolButton({
  icon: Icon,
  label,
  shortcut,
  isActive,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  shortcut?: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center justify-center size-9 rounded-full transition-colors cursor-pointer",
            isActive
              ? "bg-secondary/20 text-foreground"
              : "text-secondary hover:text-foreground hover:bg-muted",
          )}
        >
          <Icon className="size-4" strokeWidth={2} />
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
        {label}
        {shortcut && <span className="text-muted-foreground ml-1">{shortcut}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

function HeadingDropdown({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const isAnyHeading =
    editor.isActive("heading", { level: 1 }) ||
    editor.isActive("heading", { level: 2 }) ||
    editor.isActive("heading", { level: 3 });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center justify-center size-9 rounded-full transition-colors cursor-pointer",
                isAnyHeading
                  ? "bg-secondary/20 text-foreground"
                  : "text-secondary hover:text-foreground hover:bg-muted",
              )}
            >
              <IconHeading className="size-4" strokeWidth={2} />
            </motion.button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
          Heading
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-40 rounded-2xl p-2 border-none shadow-xl"
        side="top"
        align="center"
        sideOffset={12}
      >
        <div className="flex flex-col gap-1">
          {[
            { level: 1, icon: IconH1, label: "Heading 1" },
            { level: 2, icon: IconH2, label: "Heading 2" },
            { level: 3, icon: IconH3, label: "Heading 3" },
          ].map(({ level, icon: Icon, label }) => {
            const active = editor.isActive("heading", { level });
            return (
              <button
                key={level}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as 1 | 2 | 3 })
                    .run();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-sans font-medium transition-colors cursor-pointer",
                  active
                    ? "bg-secondary/20 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-4" strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function LinkPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const isActive = editor.isActive("link");

  const handleSubmit = useCallback(() => {
    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
    } else {
      const href = url.startsWith("http") ? url : `https://${url}`;
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setUrl("");
    setOpen(false);
  }, [editor, url]);

  const handleRemove = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setUrl("");
    setOpen(false);
  }, [editor]);

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val && isActive) {
          const attrs = editor.getAttributes("link");
          setUrl(attrs.href || "");
        } else if (!val) {
          setUrl("");
        }
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center justify-center size-9 rounded-full transition-colors cursor-pointer",
                isActive
                  ? "bg-secondary/20 text-foreground"
                  : "text-secondary hover:text-foreground hover:bg-muted",
              )}
            >
              <IconLink className="size-4" strokeWidth={2} />
            </motion.button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
          Link
          <span className="text-muted-foreground ml-1">⌘K</span>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-72 rounded-2xl p-3 border-none shadow-xl"
        side="top"
        align="center"
        sideOffset={12}
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-widest">
            {isActive ? "Edit Link" : "Insert Link"}
          </p>
          <Input
            autoFocus
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="font-sans text-sm rounded-xl"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              className="rounded-xl font-sans font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 flex-1"
            >
              <IconCheck className="size-3.5 mr-1" />
              {isActive ? "Update" : "Add"}
            </Button>
            {isActive && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemove}
                className="rounded-xl font-sans font-semibold text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <IconX className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function EditorToolbar({
  editor,
  focusMode,
  onFocusModeChange,
  onPublish,
  isPublishing,
}: {
  editor?: Editor | null;
  focusMode?: boolean;
  onFocusModeChange?: (val: boolean) => void;
  onPublish?: () => void;
  isPublishing?: boolean;
}) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center gap-1 rounded-full bg-card ring-1 ring-border/10 p-1.5 shadow-xl shadow-foreground/5 backdrop-blur-md">
        <TooltipProvider delayDuration={200}>
          {/* Formatting Tools */}
          {editor && (
            <>
              <div className="flex items-center gap-1 px-2">
                <ToolButton
                  icon={IconBold}
                  label="Bold"
                  shortcut="⌘B"
                  isActive={editor.isActive("bold")}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolButton
                  icon={IconItalic}
                  label="Italic"
                  shortcut="⌘I"
                  isActive={editor.isActive("italic")}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <LinkPopover editor={editor} />
                <ToolButton
                  icon={IconList}
                  label="Bullet List"
                  shortcut="⌘⇧8"
                  isActive={editor.isActive("bulletList")}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolButton
                  icon={IconBlockquote}
                  label="Blockquote"
                  shortcut="⌘⇧B"
                  isActive={editor.isActive("blockquote")}
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                />
                <HeadingDropdown editor={editor} />
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-border/50 mx-1" />
            </>
          )}

          {/* Focus Mode Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => onFocusModeChange?.(!focusMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center size-9 rounded-full text-secondary hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {focusMode ? (
                  <IconMinimize className="size-4" />
                ) : (
                  <IconMaximize className="size-4" />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
              {focusMode ? "Exit Focus Mode" : "Focus Mode"}
            </TooltipContent>
          </Tooltip>

          {/* Divider */}
          <div className="w-px h-5 bg-border/50 mx-1" />

          {/* Publish Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onPublish}
                disabled={isPublishing}
                className="rounded-full gap-3 font-sans font-semibold shadow-none bg-secondary hover:bg-secondary/90 text-secondary-foreground pl-5 pr-1.5 h-10 ml-1"
              >
                {isPublishing ? "Publishing..." : "Publish"}
                <div className="flex items-center justify-center size-7 rounded-full bg-background/20">
                  {isPublishing ? (
                    <IconLoader2 className="size-4 animate-spin" />
                  ) : (
                    <IconArrowRight className="size-4" />
                  )}
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
              Publish your entry
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
