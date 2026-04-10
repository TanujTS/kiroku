"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { flushSync } from "react-dom";

/**
 * Wraps next-themes' setTheme with the View Transition API
 * for a smooth vertical-sweep animation.
 *
 * - Light → Dark: old (light) sweeps away top→bottom, revealing dark
 * - Dark → Light: new (light) sweeps in bottom→top, covering dark
 */
export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const setThemeWithTransition = useCallback(
    (newTheme: string, _event?: React.MouseEvent) => {
      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(newTheme);
        return;
      }

      const targetIsDark =
        newTheme === "dark" ||
        (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

      const isCurrentlyDark = resolvedTheme === "dark";

      // No visual change
      if (targetIsDark === isCurrentlyDark) {
        setTheme(newTheme);
        return;
      }

      // Set a data attribute BEFORE the transition starts so CSS
      // can assign the correct z-index layering per direction
      if (!isCurrentlyDark) {
        document.documentElement.dataset.themeTransition = "to-dark";
      }

      const transition = document.startViewTransition(() => {
        // Synchronously flip the class so the snapshot captures
        // the correct new state (next-themes does this in useEffect)
        const root = document.documentElement;
        if (targetIsDark) {
          root.classList.add("dark");
          root.style.colorScheme = "dark";
        } else {
          root.classList.remove("dark");
          root.style.colorScheme = "light";
        }

        flushSync(() => {
          setTheme(newTheme);
        });
      });

      transition.ready.then(() => {
        if (isCurrentlyDark) {
          // Dark → Light: new (light) sweeps up from bottom
          document.documentElement.animate(
            { clipPath: ["inset(100% 0 0 0)", "inset(0 0 0 0)"] },
            {
              duration: 600,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        } else {
          // Light → Dark: old (light) sweeps away from top→bottom
          document.documentElement.animate(
            { clipPath: ["inset(0 0 0 0)", "inset(0 0 100% 0)"] },
            {
              duration: 600,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-old(root)",
            },
          );
        }
      });

      transition.finished.then(() => {
        delete document.documentElement.dataset.themeTransition;
      });
    },
    [setTheme, resolvedTheme],
  );

  return { theme, setThemeWithTransition };
}
