"use client";

import {
  IconArrowRight,
  IconBlockquote,
  IconBold,
  IconItalic,
  IconLink,
  IconList,
  IconLoader2,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const tools = [
  { icon: IconBold, label: "Bold", shortcut: "⌘B" },
  { icon: IconItalic, label: "Italic", shortcut: "⌘I" },
  { icon: IconLink, label: "Link", shortcut: "⌘K" },
  { icon: IconList, label: "List", shortcut: "⌘L" },
  { icon: IconBlockquote, label: "Quote", shortcut: "⌘Q" },
];

export function EditorToolbar({
  focusMode,
  onFocusModeChange,
  onPublish,
  isPublishing,
}: {
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
          <div className="flex items-center gap-1 px-2">
            {tools.map((tool) => (
              <Tooltip key={tool.label}>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center size-9 rounded-full text-secondary hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    <tool.icon className="size-4" strokeWidth={2} />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="rounded-lg font-sans text-xs mb-2">
                  {tool.label}
                  <span className="text-muted-foreground ml-1">{tool.shortcut}</span>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-border/50 mx-1" />

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
