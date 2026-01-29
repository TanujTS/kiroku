"use client";

import { useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { IconBold, IconItalic, IconCode, IconLink, IconList, IconListNumbers, IconQuote, IconH1, IconH2, IconPhoto, IconDeviceFloppy, IconSend } from "@tabler/icons-react";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Inserts markdown syntax at cursor position or wraps selected text.
     * If no text is selected, places cursor between prefix and suffix.
     */
    const insertMarkdown = useCallback((prefix: string, suffix: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const hasSelection = start !== end;

        const newText =
            content.substring(0, start) +
            prefix +
            selectedText +
            suffix +
            content.substring(end);

        setContent(newText);

        // Position cursor correctly after insertion
        setTimeout(() => {
            textarea.focus();
            if (hasSelection) {
                // If text was selected, place cursor after the closing syntax
                const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            } else {
                // If no selection, place cursor between prefix and suffix
                const cursorPos = start + prefix.length;
                textarea.setSelectionRange(cursorPos, cursorPos);
            }
        }, 0);
    }, [content]);

    /**
     * Toolbar button configuration
     * Each button has an icon and markdown syntax to insert
     */
    const toolbarButtons = [
        { icon: IconH1, action: () => insertMarkdown("# "), title: "Heading 1" },
        { icon: IconH2, action: () => insertMarkdown("## "), title: "Heading 2" },
        { icon: IconBold, action: () => insertMarkdown("**", "**"), title: "Bold" },
        { icon: IconItalic, action: () => insertMarkdown("*", "*"), title: "Italic" },
        { icon: IconCode, action: () => insertMarkdown("`", "`"), title: "Inline Code" },
        { icon: IconLink, action: () => insertMarkdown("[", "](url)"), title: "Link" },
        { icon: IconPhoto, action: () => insertMarkdown("![alt](", ")"), title: "Image" },
        { icon: IconList, action: () => insertMarkdown("- "), title: "Bullet List" },
        { icon: IconListNumbers, action: () => insertMarkdown("1. "), title: "Numbered List" },
        { icon: IconQuote, action: () => insertMarkdown("> "), title: "Quote" },
    ];

    /**
     * Handle form submission
     * This would send data to your API route
     */
    const handleSubmit = async (published: boolean) => {
        setIsSaving(true);

        try {
            // TODO: Create an API route at /api/posts to handle this
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content, // Store raw markdown - render on display
                    published,
                }),
            });

            if (response.ok) {
                // Redirect to the post or dashboard
                // router.push("/posts");
                alert(published ? "Published!" : "Draft saved!");
            }
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header with actions */}
            <header className="sticky top-0 z-10 border-b border-border bg-background backdrop-blur-sm">
                <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-4">
                    <h1 className="text-lg font-space font-semibold text-foreground">New Post</h1>

                    <div className="flex items-center gap-3">
                        {/* Toggle between edit and preview */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPreview(!isPreview)}
                        >
                            {isPreview ? "Edit" : "Preview"}
                        </Button>

                        {/* Save as draft */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSubmit(false)}
                            disabled={isSaving || !title.trim()}
                        >
                            <IconDeviceFloppy className="size-4" />
                            Save Draft
                        </Button>

                        {/* Publish */}
                        <Button
                            size="sm"
                            onClick={() => handleSubmit(true)}
                            disabled={isSaving || !title.trim() || !content.trim()}
                        >
                            <IconSend className="size-4" />
                            Publish
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main editor area */}
            <main className="mx-auto max-w-4xl px-6 py-8">
                {/* Title input - clean, minimal like Notion */}
                <input
                    type="text"
                    placeholder="Untitled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent text-4xl font-space font-bold text-foreground placeholder:text-muted-foreground/50 outline-none mb-8"
                />

                {/* Toolbar - only show in edit mode */}
                {!isPreview && (
                    <div className="flex items-center gap-1 pb-4 mb-4 border-b border-border overflow-x-auto">
                        {toolbarButtons.map((btn, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={btn.action}
                                        className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200"
                                    >
                                        <btn.icon className="size-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>{btn.title}</TooltipContent>
                            </Tooltip>
                        ))}

                        {/* Code block button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => insertMarkdown("```\n", "\n```")}
                                    className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200 ml-2"
                                >
                                    <span className="text-xs font-mono">{"{ }"}</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Code Block</TooltipContent>
                        </Tooltip>
                    </div>
                )}

                {/* Editor / Preview area */}
                {isPreview ? (
                    // Preview mode - rendered markdown
                    <article className="prose prose-kiroku dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {content || "*Start writing to see preview...*"}
                        </ReactMarkdown>
                    </article>
                ) : (
                    // Edit mode - textarea that auto-expands
                    <textarea
                        placeholder="Start writing your story... (Markdown supported)"
                        value={content}
                        ref={textareaRef}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[40vh] bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none resize-none font-inter text-lg leading-relaxed overflow-hidden"
                        style={{ fieldSizing: 'content' } as React.CSSProperties}
                    />
                )}
            </main>
        </div>
    );
}