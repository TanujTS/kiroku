"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { IconDeviceFloppy, IconSend, IconEye, IconEyeOff } from "@tabler/icons-react";
import { EditorToolbar, MarkdownPreview, EmptyEditor } from "@/components/editor";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Inserts markdown syntax at cursor position or wraps selected text.
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

        setTimeout(() => {
            textarea.focus();
            if (hasSelection) {
                const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            } else {
                const cursorPos = start + prefix.length;
                textarea.setSelectionRange(cursorPos, cursorPos);
            }
        }, 0);
    }, [content]);

    /**
     * Handle form submission
     */
    const handleSubmit = async (published: boolean) => {
        setIsSaving(true);

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, published }),
            });

            if (response.ok) {
                alert(published ? "Published!" : "Draft saved!");
            }
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleStartWriting = () => {
        setHasStarted(true);
        setTimeout(() => textareaRef.current?.focus(), 0);
    };

    // Show empty state if user hasn't started
    const showEmptyState = !hasStarted && !content.trim() && !title.trim();

    return (
        <div className="page-shell">
            {/* Header */}
            <header className="page-header">
                <div className="page-container flex items-center justify-between py-4">
                    <h1 className="text-lg font-space font-semibold text-foreground">New Post</h1>

                    <div className="flex items-center gap-3">
                        {/* Preview toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsPreview(!isPreview)}
                        >
                            {isPreview ? (
                                <><IconEyeOff className="size-4" /> Edit</>
                            ) : (
                                <><IconEye className="size-4" /> Preview</>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSubmit(false)}
                            disabled={isSaving || !title.trim()}
                        >
                            <IconDeviceFloppy className="size-4" />
                            Save Draft
                        </Button>

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

            {/* Main content */}
            <main className="page-container py-8">
                {/* Title input */}
                <input
                    type="text"
                    placeholder="Untitled"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (e.target.value.trim()) setHasStarted(true);
                    }}
                    className="w-full bg-transparent text-4xl font-space font-bold text-foreground placeholder:text-muted-foreground/50 outline-none mb-8"
                />

                {showEmptyState ? (
                    <EmptyEditor onStartWriting={handleStartWriting} />
                ) : isPreview ? (
                    /* Preview mode */
                    <div>
                        {content.trim() ? (
                            <MarkdownPreview content={content} />
                        ) : (
                            <p className="text-muted-foreground/50 italic">
                                Nothing to preview yet...
                            </p>
                        )}
                    </div>
                ) : (
                    /* Editor mode */
                    <div>
                        <EditorToolbar onInsert={insertMarkdown} />

                        <textarea
                            ref={textareaRef}
                            placeholder="Start writing your story... (Markdown supported)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[50vh] bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none resize-none text-lg leading-relaxed"
                            style={{ fieldSizing: 'content' } as React.CSSProperties}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
