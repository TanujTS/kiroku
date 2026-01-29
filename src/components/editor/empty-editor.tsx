"use client";

import { IconPencil, IconMarkdown, IconBulb } from "@tabler/icons-react";

interface EmptyEditorProps {
    onStartWriting: () => void;
}

export function EmptyEditor({ onStartWriting }: EmptyEditorProps) {
    const tips = [
        { icon: IconMarkdown, text: "Use **bold** and *italic* for emphasis" },
        { icon: IconPencil, text: "Start with # for headings" },
        { icon: IconBulb, text: "Preview updates live as you type" },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Main CTA */}
            <div className="mb-8">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <IconPencil className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-space font-semibold text-foreground mb-2">
                    Start your story
                </h2>
                <p className="text-muted-foreground max-w-sm">
                    Write in Markdown and see your content come to life with live preview.
                </p>
            </div>

            {/* Quick tips */}
            <div className="flex flex-col gap-3 mb-8">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                        <tip.icon className="size-4 text-primary/60" />
                        <span>{tip.text}</span>
                    </div>
                ))}
            </div>

            {/* Start button */}
            <button
                type="button"
                onClick={onStartWriting}
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
                Start writing
            </button>
        </div>
    );
}
