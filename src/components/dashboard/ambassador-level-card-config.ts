import { Flame, Shield, Award, Crown, Gem, Trophy } from 'lucide-react';
import { createElement } from 'react';
import type { MascotVariant } from '@/components/ui/mascot-image';

/* ── Tier gradient header ─────────────────────────────── */
export const TIER_CARD_GRADIENT: Record<string, string> = {
  'Người nhóm lửa':       'from-orange-500 to-amber-400',
  'Đại sứ dự bị':          'from-blue-500 to-sky-400',
  'Silver Ambassador':     'from-slate-500 to-slate-400',
  'Đại sứ bền bỉ':         'from-amber-500 to-yellow-400',
  'Gold Ambassador':       'from-yellow-500 to-amber-300',
  'Champion of the Year':  'from-cyan-500 to-teal-400',
};

/* ── Next-tier info box subtle bg ────────────────────── */
export const TIER_NEXT_BG: Record<string, string> = {
  'Đại sứ dự bị':          'from-blue-50 to-sky-50 border-blue-200 dark:from-blue-950/20 dark:to-sky-950/20 dark:border-blue-800/40',
  'Silver Ambassador':     'from-slate-50 to-slate-100 border-slate-200 dark:from-slate-800/20 dark:border-slate-700/40',
  'Đại sứ bền bỉ':         'from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-950/20 dark:border-amber-800/40',
  'Gold Ambassador':       'from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950/20 dark:border-yellow-800/40',
  'Champion of the Year':  'from-cyan-50 to-teal-50 border-cyan-200 dark:from-cyan-950/20 dark:border-cyan-800/40',
};

/* ── Mascot variant per tier ─────────────────────────── */
export const TIER_MASCOT_VARIANT: Record<string, MascotVariant> = {
  'Người nhóm lửa':       'encourage',
  'Đại sứ dự bị':          'typing',
  'Silver Ambassador':     'search',
  'Đại sứ bền bỉ':         'gift',
  'Gold Ambassador':       'celebrate',
  'Champion of the Year':  'celebrate',
};

/* ── Icons (inline elements, not JSX — imported in component) */
export const TIER_ICON_MAP: Record<string, typeof Flame> = {
  'Người nhóm lửa':       Flame,
  'Đại sứ dự bị':          Shield,
  'Silver Ambassador':     Award,
  'Đại sứ bền bỉ':         Crown,
  'Gold Ambassador':       Gem,
  'Champion of the Year':  Trophy,
};

/* ── Milestone dot colors ────────────────────────────── */
export const TIER_MILESTONE_ACTIVE: Record<string, string> = {
  'Người nhóm lửa': 'bg-orange-500 border-orange-300 shadow-orange-500/40 dark:border-orange-400',
  'Đại sứ dự bị': 'bg-blue-500 border-blue-300 shadow-blue-500/40 dark:border-blue-400',
  'Silver Ambassador': 'bg-slate-400 border-slate-200 shadow-slate-400/40 dark:border-slate-300',
  'Đại sứ bền bỉ': 'bg-amber-500 border-amber-300 shadow-amber-500/40 dark:border-amber-400',
  'Gold Ambassador': 'bg-yellow-500 border-yellow-300 shadow-yellow-500/40 dark:border-yellow-400',
  'Champion of the Year': 'bg-cyan-400 border-cyan-200 shadow-cyan-400/40 dark:border-cyan-300',
};

export const TIER_TEXT_ACTIVE: Record<string, string> = {
  'Người nhóm lửa': 'text-orange-600 dark:text-orange-400',
  'Đại sứ dự bị': 'text-blue-600 dark:text-blue-400',
  'Silver Ambassador': 'text-slate-500 dark:text-slate-300',
  'Đại sứ bền bỉ': 'text-amber-600 dark:text-amber-400',
  'Gold Ambassador': 'text-yellow-600 dark:text-yellow-400',
  'Champion of the Year': 'text-cyan-600 dark:text-cyan-400',
};

export const TIER_BADGE_STYLES: Record<string, string> = {
  'Người nhóm lửa': 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-700/50',
  'Đại sứ dự bị': 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700/50',
  'Silver Ambassador': 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600/50',
  'Đại sứ bền bỉ': 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700/50',
  'Gold Ambassador': 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-700/50',
  'Champion of the Year': 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-400 dark:border-cyan-700/50',
};
