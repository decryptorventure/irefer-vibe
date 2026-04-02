# UI-Kit Migration Plan

## Status Check

**Current state**: `@frontend-team/ui-kit` chỉ được apply cho 2 component:
- `Skeleton` (trong các skeleton files)
- `Toaster` (trong `App.tsx`)

Tất cả các component còn lại (`Button`, `Card`, `Badge`, `Input`, v.v.) đang dùng local implementations trong `src/components/ui/` — là custom wrappers quanh `@base-ui/react` theo pattern của shadcn/ui.

---

## API Compatibility Analysis

| Component | Local API | UI-Kit API | Compatibility |
|-----------|-----------|------------|---------------|
| Card / CardHeader / CardContent... | `React.HTMLAttributes<div>` + `size?` | Same + `shadow?` `hoverable?` | ✅ Drop-in |
| Input | base-ui/react | `React.ComponentProps<input>` + optional `variant?` | ✅ Drop-in |
| Textarea | base-ui/react | `React.ComponentProps<textarea>` + optional `variant?` | ✅ Drop-in |
| Progress | shadcn-like | Standard progress | ✅ Drop-in |
| Tooltip | shadcn compound | Need to check | 🔍 Verify |
| **Button** | variants: `default/outline/ghost/secondary/destructive/link` + `render` prop (base-ui) | variants: `primary/border/subtle/secondary/danger` + `asChild` (Radix) | ⚠️ Needs adapter |
| **Badge** | variants: `default/secondary/destructive/outline` | variants: `primary/default/error/success/warning/info/outline` | ⚠️ Variant renaming |
| Tabs | Compound: `Tabs/TabsList/TabsTrigger/TabsContent` | Single: `<Tabs items={[]}/>` | ❌ Breaking (skip) |
| Select | Compound: `Select/SelectContent/SelectItem/SelectTrigger/SelectValue` | Single: `<Select options={[]}/>`| ❌ Breaking (skip) |
| Dialog | Compound shadcn pattern | Single: `<Modal trigger title children footer />` | ❌ Breaking (skip) |
| Avatar | Compound: `Avatar/AvatarImage/AvatarFallback` | Single: `<Avatar src fallback />` | ❌ Breaking (skip) |
| Command | shadcn | Not in ui-kit | 🚫 Keep local |
| Table | shadcn | Not in ui-kit | 🚫 Keep local |
| Label | shadcn | Not in ui-kit | 🚫 Keep local |

---

## Strategy: Update Proxy Files (Minimal page-level changes)

Pages import from `@/components/ui/X`. Update the proxy files in `src/components/ui/` to delegate to ui-kit. Pages stay unchanged for Phase 1.

---

## Phase 1 — Drop-in Proxy Swaps (No page changes needed)
**Files**: `card.tsx`, `input.tsx`, `textarea.tsx`, `progress.tsx`

Change local implementations to re-export from `@frontend-team/ui-kit`.

## Phase 2 — Button Migration (Breaking: 16 usages in 11 files)
**Effort**: High — variant renaming + render-prop → asChild conversion

Mapping:
- `variant="default"` → `variant="primary"`
- `variant="outline"` → `variant="border"`
- `variant="ghost"` → `variant="subtle"`
- `variant="destructive"` → `variant="danger"`
- `variant="secondary"` → stays `"secondary"`
- `render={<Link to="..." />} nativeButton={false}` → `asChild` + wrap content in `<Link>`

Files to update: `CandidateDetail.tsx`, `JobDetail.tsx`, `JobList.tsx`, `MyReferrals.tsx`, `Refer.tsx`, `ambassador-level-card.tsx`, `campaign-banner.tsx`, `hot-jobs-card.tsx`, `Header.tsx`, `dialog.tsx`, `select.tsx`

## Phase 3 — Badge Migration (Simple variant renaming, 12 usages)
Mapping:
- `variant="secondary"` → `variant="default"` (3×)
- `variant="destructive"` → `variant="error"` (3×)
- `variant="outline"` → stays ✅ (6×)

## Phase 4 — Keep Local (YAGNI)
- `Tabs`, `Select`, `Dialog`, `Avatar`, `Command`, `Table`, `Label` — APIs are fundamentally different, local implementations work fine.

---

## Files

- [phase-01-drop-in-proxies.md](phase-01-drop-in-proxies.md)
- [phase-02-button-migration.md](phase-02-button-migration.md)
- [phase-03-badge-migration.md](phase-03-badge-migration.md)
