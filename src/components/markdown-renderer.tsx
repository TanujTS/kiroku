"use client";

/**
 * Renders post content. Handles both:
 * - New HTML content (from Tiptap editor) — rendered via dangerouslySetInnerHTML
 * - Legacy plain text content (pre-Tiptap) — wrapped in <p> tags
 *
 * The Tiptap CSS styles in globals.css handle all the inner element styling
 * so we use the same `.tiptap` class for consistent rendering.
 */
export function MarkdownRenderer({ content }: { content: string }) {
  // Detect if content is HTML (starts with a tag) or plain text
  const isHtml = content.trimStart().startsWith("<");

  if (isHtml) {
    return (
      <article
        className="tiptap prose prose-lg md:prose-xl max-w-none font-serif text-muted-foreground leading-relaxed md:leading-loose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Legacy plain text: split on double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <article className="tiptap prose prose-lg md:prose-xl max-w-none font-serif text-muted-foreground leading-relaxed md:leading-loose">
      {paragraphs.map((para, i) => {
        if (para.trim().startsWith(">")) {
          const quoteText = para.replace(/>/g, "").trim();
          return (
            <blockquote
              key={i}
              className="my-12 p-8 md:p-12 bg-muted/20 border-l-4 border-secondary rounded-r-3xl"
            >
              <p className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-4 leading-snug">
                &ldquo;{quoteText}&rdquo;
              </p>
            </blockquote>
          );
        }
        return (
          <p key={i} className="mb-8">
            {para}
          </p>
        );
      })}
    </article>
  );
}
