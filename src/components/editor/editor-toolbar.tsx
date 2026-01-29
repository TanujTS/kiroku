"use client";

import { useMemo, useCallback } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
    IconBold,
    IconItalic,
    IconCode,
    IconLink,
    IconList,
    IconListNumbers,
    IconQuote,
    IconH1,
    IconH2,
    IconPhoto,
} from "@tabler/icons-react";

interface ToolbarButton {
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    title: string;
}

interface EditorToolbarProps {
    onInsert: (prefix: string, suffix?: string) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
    /**
     * Memoized toolbar button configuration
     * Only recreates when onInsert changes
     */
    const toolbarButtons: ToolbarButton[] = useMemo(() => [
        { icon: IconH1, action: () => onInsert("# "), title: "Heading 1" },
        { icon: IconH2, action: () => onInsert("## "), title: "Heading 2" },
        { icon: IconBold, action: () => onInsert("**", "**"), title: "Bold" },
        { icon: IconItalic, action: () => onInsert("*", "*"), title: "Italic" },
        { icon: IconCode, action: () => onInsert("`", "`"), title: "Inline Code" },
        { icon: IconLink, action: () => onInsert("[", "](url)"), title: "Link" },
        { icon: IconPhoto, action: () => onInsert("![alt](", ")"), title: "Image" },
        { icon: IconList, action: () => onInsert("- "), title: "Bullet List" },
        { icon: IconListNumbers, action: () => onInsert("1. "), title: "Numbered List" },
        { icon: IconQuote, action: () => onInsert("> "), title: "Quote" },
    ], [onInsert]);

    const insertCodeBlock = useCallback(() => {
        onInsert("```\n", "\n```");
    }, [onInsert]);

    return (
        <div className="flex items-center gap-1 pb-4 mb-4 border-b border-border overflow-x-auto">
            {toolbarButtons.map((btn, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={btn.action}
                            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200"
                        >
                            <btn.icon className="size-5" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{btn.title}</TooltipContent>
                </Tooltip>
            ))}

            {/* Separator */}
            <div className="w-px h-5 bg-border mx-1" />

            {/* Code block button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        onClick={insertCodeBlock}
                        className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200"
                    >
                        <span className="text-xs font-mono">{"{ }"}</span>
                    </button>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
            </Tooltip>
        </div>
    );
}
