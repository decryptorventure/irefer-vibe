# iRefer — AI Agent Configuration

## UI Component Library

This project uses `@frontend-team/ui-kit`.

**Before writing any UI code, read:** https://ui.ikameglobal.com/llms.txt
**Component-specific docs:** `https://ui.ikameglobal.com/component-docs/[component-name].md`

---

## Rules

### 1. Import from top-level package only
```ts
import { Button, Badge, Input } from "@frontend-team/ui-kit"
// ❌ NEVER: import { Button } from "@frontend-team/ui-kit/button"
```

### 2. Use design token classes — NEVER raw Tailwind colors
```tsx
// ✅ Correct — works with dark mode
<div className="bg_primary text_primary border_secondary">
// ❌ Wrong — breaks dark mode
<div className="bg-white text-gray-900 border-gray-200">
```

### 3. Use cn() from ui-kit — NEVER clsx/tailwind-merge
```ts
import { cn } from "@frontend-team/ui-kit"
cn("bg_primary", isActive && "border_accent", className)
```

### 4. Hover/focus: use state_* classes (Tailwind modifiers don't work)
```tsx
// ❌ Does NOT work
className="hover:bg_secondary focus:border_input"
// ✅ Use pre-compiled state classes
className="hover:state_bg_secondary_soft active:state_bg_secondary_medium"
```

### 5. Icon-only buttons require aria-label
```tsx
// ❌ <Button size="icon-m"><X /></Button>
// ✅ <Button size="icon-m" aria-label="Close"><X /></Button>
```

### 6. Required providers in app root
```tsx
// <TooltipProvider> wraps the app — required for all <Tooltip> to work
// <Toaster /> must be in root — call toast() anywhere after that
```

### 7. Select inside Modal/Drawer: pass portalContainer
```tsx
const [container, setContainer] = useState<HTMLElement | null>(null)
<div ref={setContainer}>
  <Select options={opts} portalContainer={container} />
</div>
```

### 8. Dark mode — use useDarkMode hook
```tsx
import { useDarkMode, Button } from "@frontend-team/ui-kit"
import { Moon, Sun } from "lucide-react"

function ThemeToggle() {
  const { isDark, toggle } = useDarkMode()
  return (
    <Button size="icon-m" variant="subtle" onClick={toggle} aria-label="Toggle theme">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
// Toggles .dark on <html>, persists to localStorage, falls back to system preference.
// No extra CSS or config needed.
```

---

## Quick Reference

| Rule | ✅ Do | ❌ Don't |
|------|-------|---------|
| Colors | `bg_primary text_primary` | `bg-white text-gray-900` |
| Hover | `hover:state_bg_secondary_soft` | `hover:bg_secondary` |
| Class merge | `cn()` from ui-kit | `clsx`, `tailwind-merge` |
| Toaster | `<Toaster />` in app root | Toast before Toaster in tree |
| Tooltip | `<TooltipProvider>` wraps app | `<Tooltip>` without provider |
| Icon buttons | `aria-label="..."` | No aria-label |
| Select in Modal | `portalContainer` prop | Default portal (z-index bug) |

## Button Variants (ui-kit)
`primary` | `secondary` | `dim` | `border` | `subtle` | `danger`

> Local proxy mapping (old shadcn → ui-kit): `default→primary`, `outline→border`, `ghost→subtle`, `destructive→danger`

## Badge Variants (ui-kit)
`primary` | `default` | `error` | `success` | `warning` | `info` | `outline`

> Local proxy mapping: `secondary→default`, `destructive→error`

## Components NOT from ui-kit (keep local shadcn wrappers)
`Tabs`, `Select` (compound), `Dialog`, `Avatar`, `Command`, `Table`, `Label`
These have incompatible APIs — do not replace with ui-kit equivalents.
