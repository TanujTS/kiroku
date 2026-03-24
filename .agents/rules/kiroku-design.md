---
trigger: always_on
---

# Kiroku — Frontend Design System Rules

## Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS v4
- Components: shadcn/ui
- Fonts: Unbounded (headings), Space Grotesk (body) — loaded via `next/font`

---

## Colors — NEVER hardcode hex or oklch values

All colors must reference the CSS variables defined in `global.css`.
Use Tailwind utility classes that map to those variables.

### Approved utility classes
| Intent            | Class                    |
|-------------------|--------------------------|
| Page background   | `bg-background`          |
| Card / surface    | `bg-card`                |
| Muted surface     | `bg-muted`               |
| Primary brand     | `bg-primary`             |
| Secondary brand   | `bg-secondary`           |
| Body text         | `text-foreground`        |
| Muted text        | `text-muted-foreground`  |
| Primary text      | `text-primary`           |
| Secondary text    | `text-secondary`         |
| Borders           | `border-border`          |
| Input borders     | `border-input`           |
| Focus ring        | `ring-ring`              |
| Destructive       | `bg-destructive` / `text-destructive` |

### Opacity variants are fine
`bg-primary/20`, `text-foreground/60`, etc. are allowed.

### What NOT to do
```tsx
// ❌ Never
<div style={{ color: '#92A9E1' }} />
<div className="bg-[#FEF9EF]" />
<div className="text-[oklch(0.141_0.005_285.823)]" />
```

---

## Typography — NEVER use arbitrary font families

Fonts are configured in `global.css` via `--font-heading` and `--font-sans`.

### Approved classes
| Intent                         | Class            |
|--------------------------------|------------------|
| Hero / brand / section titles  | `font-heading`   |
| All other UI text (default)    | `font-sans`      |
| Long-form reader content       | `font-serif`     |

### Heading weights
- `h1`, `h2`, `h3` → always `font-heading font-bold tracking-tight`
- `h4`, `h5`, `h6` → `font-sans font-semibold tracking-tight`

### Body weights
- Default copy → `font-normal` (400)
- Emphasis / labels → `font-medium` (500)
- UI actions / nav → `font-semibold` (600)

### What NOT to do
```tsx
// ❌ Never
<h1 style={{ fontFamily: 'Unbounded' }} />
<p className="font-['Space_Grotesk']" />
<h2 className="font-['Inter']" />  // Inter is only for reader mode
```

---

## Spacing & Roundness

- Prefer generous whitespace. Default to `p-6` or `p-8` for containers.
- **Buttons and badges** → `rounded-full`
- **Cards and larger containers** → `rounded-3xl` (maps to `~2rem` via the radius scale)
- **Inputs and small elements** → `rounded-lg`
- **No heavy shadows.** Use `shadow-none`. Depth comes from tonal surface shifts (`bg-muted` vs `bg-background`).

---

## shadcn/ui Usage

- Always use shadcn components before building custom ones.
- Do not override shadcn component internals with arbitrary Tailwind values.
  Override only via the CSS variable tokens in `global.css`.
- Preferred components: `Button`, `Card`, `Input`, `Badge`, `Dialog`, `Separator`, `Tabs`, `Tooltip`.

### Button conventions
```tsx
// Primary CTA
<Button>Get Started</Button>  // uses bg-primary by default

// Ghost / secondary action
<Button variant="ghost">Learn more</Button>

// Destructive
<Button variant="destructive">Delete</Button>
```

---

## Dark Mode

- Use the `dark:` variant for overrides — never write separate dark components.
- The `.dark` class is on `<html>`. All CSS variables auto-switch.
- Do not use `prefers-color-scheme` media queries — use the `.dark` class strategy.

---

## General Rules

1. **No inline styles** for anything covered by the design system (colors, fonts, spacing, radius).
2. **No hardcoded color values** anywhere in JSX or CSS modules.
3. All new components must be readable in both light and dark mode without extra work.
4. Keep components stateless and composable where possible.
5. Use `cn()` (from `lib/utils`) for conditional class merging — never string concatenation.