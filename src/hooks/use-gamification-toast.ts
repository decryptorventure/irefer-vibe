import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';
import { getCurrentTier } from '@/lib/points-utils';

const STORAGE_KEY = 'irefer_last_tier';

/**
 * Watches user points and shows a celebration toast when
 * the user levels up to a new Ambassador tier.
 *
 * Should be called once in the app shell (Layout).
 */
export function useGamificationToast() {
  const user = useAuthStore((s) => s.user);
  const hasInitialised = useRef(false);

  useEffect(() => {
    if (!user) return;

    const currentTier = getCurrentTier(user.points);
    const currentTierName = currentTier?.name ?? null;
    const lastTier = localStorage.getItem(STORAGE_KEY);

    // First run: just store the current tier, don't toast
    if (!hasInitialised.current) {
      hasInitialised.current = true;
      if (!lastTier && currentTierName) {
        localStorage.setItem(STORAGE_KEY, currentTierName);
      }
      // If stored tier differs from current on page load, it means
      // user levelled up while away — show toast
      if (lastTier && currentTierName && lastTier !== currentTierName) {
        showLevelUpToast(currentTierName, currentTier!.reward);
        localStorage.setItem(STORAGE_KEY, currentTierName);
      }
      return;
    }

    // Subsequent updates (points changed during the session)
    if (currentTierName && currentTierName !== lastTier) {
      showLevelUpToast(currentTierName, currentTier!.reward);
      localStorage.setItem(STORAGE_KEY, currentTierName);
    }
  }, [user?.points]);
}

function showLevelUpToast(tierName: string, reward: string) {
  const TIER_EMOJI: Record<string, string> = {
    Bronze: '🥉',
    Silver: '🥈',
    Gold: '🥇',
    Diamond: '💎',
  };
  const emoji = TIER_EMOJI[tierName] ?? '🏆';

  toast.success(`${emoji} Chúc mừng thăng hạng ${tierName}!`, {
    description: `Bạn đã đạt hạng ${tierName}. Nhận ngay ${reward}!`,
    duration: 8000,
  });
}
