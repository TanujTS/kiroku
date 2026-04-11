"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onContentChange: (html: string) => void;
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
}

export function TiptapEditor({ content, onContentChange, onEditorReady }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Begin your story...",
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[50vh] font-serif text-xl leading-relaxed text-foreground outline-none border-none resize-none",
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    // Prevents SSR hydration issues
    immediatelyRender: false,
  });

  // Expose editor instance to parent
  useEffect(() => {
    if (editor) {
      onEditorReady?.(editor);
    }
  }, [editor, onEditorReady]);

  return <EditorContent editor={editor} />;
}
