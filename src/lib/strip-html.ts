/**
 * Strips HTML tags from a string, returning plain text.
 * Used for generating clean post snippets from Tiptap HTML content.
 */
export function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ") // Remove all HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp;
    .replace(/&amp;/g, "&") // Replace &amp;
    .replace(/&lt;/g, "<") // Replace &lt;
    .replace(/&gt;/g, ">") // Replace &gt;
    .replace(/&quot;/g, '"') // Replace &quot;
    .replace(/&#39;/g, "'") // Replace &#39;
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}
