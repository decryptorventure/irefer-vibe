# Phase 6: Testing & Code Review

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 4h

Run full testing suite, compile verification, and code review after all implementation phases.

## Requirements
- All pages render without errors
- No TypeScript compile errors
- No broken routes or dead links
- Responsive on mobile and desktop
- Dark mode works on all new/modified pages
- Lint passes
- Performance: no noticeable degradation

## Implementation Steps

1. **Compile check**: `npm run build` — fix all TS errors
2. **Lint check**: `npm run lint` — fix critical issues
3. **Manual verification**:
   - Navigate all routes: /, /jobs, /jobs/:id, /leaderboard, /rewards, /refer, /my-referrals, /referrals/:id
   - Verify `/profile` no longer accessible
   - Test all navigation links (sidebar, bottom nav, in-page links)
   - Test dark mode toggle on all pages
   - Test responsive on mobile viewport
4. **Code review**:
   - No unused imports
   - No console.logs left
   - Consistent use of ui-kit design tokens (no raw Tailwind colors)
   - Proper `cn()` usage
   - Proper aria-labels on icon buttons
5. **Fix issues**: Address any failures found

## Todo List
- [ ] Run npm run build — fix errors
- [ ] Run npm run lint — fix issues
- [ ] Verify all routes work
- [ ] Test dark mode on all pages
- [ ] Test mobile responsiveness
- [ ] Code review for standards compliance
- [ ] Fix all found issues

## Success Criteria
- `npm run build` passes with zero errors
- `npm run lint` passes
- All routes render correctly
- Dark mode works everywhere
- Mobile layout works on all pages
- Code follows project standards (ui-kit tokens, cn(), aria-labels)
