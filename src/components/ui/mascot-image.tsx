import { cn } from '@frontend-team/ui-kit';

export type MascotVariant = 'greeting' | 'search' | 'celebrate' | 'encourage' | 'typing' | 'gift';
export type MascotSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const MASCOT_IMAGES: Record<MascotVariant, string> = {
  greeting: '/mascot/mascot-greeting.png',
  search: '/mascot/mascot-search.png',
  celebrate: '/mascot/mascot-celebrate.png',
  encourage: '/mascot/mascot-encourage.png',
  typing: '/mascot/mascot-typing.png',
  gift: '/mascot/mascot-gift.png',
};

const MASCOT_ALT: Record<MascotVariant, string> = {
  greeting: 'Đại sứ góp lửa chào bạn',
  search: 'Đại sứ góp lửa tìm kiếm',
  celebrate: 'Đại sứ góp lửa ăn mừng',
  encourage: 'Đại sứ góp lửa cổ vũ',
  typing: 'Đại sứ góp lửa nhập liệu',
  gift: 'Đại sứ góp lửa tặng quà',
};

const SIZE_MAP: Record<MascotSize, string> = {
  xs: 'w-10 h-10',
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
  xl: 'w-36 h-36',
  '2xl': 'w-44 h-44',
  '3xl': 'w-56 h-56',
  '4xl': 'w-72 h-72',
  '5xl': 'w-80 h-80',
};

interface MascotImageProps {
  variant: MascotVariant;
  size?: MascotSize;
  className?: string;
  animate?: boolean;
  /** Hide on mobile screens (< md breakpoint) */
  hideOnMobile?: boolean;
  /** Use on dark/colored backgrounds — skips mix-blend-mode */
  onDarkBg?: boolean;
}

export function MascotImage({
  variant,
  size = 'md',
  className,
  animate = true,
  hideOnMobile = false,
  onDarkBg = false,
}: MascotImageProps) {
  return (
    <img
      src={MASCOT_IMAGES[variant]}
      alt={MASCOT_ALT[variant]}
      draggable={false}
      className={cn(
        SIZE_MAP[size],
        'object-contain select-none pointer-events-none',
        // PNGs are RGBA transparent — no blend mode needed; use drop-shadow for contrast
        onDarkBg
          ? 'drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]'
          : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        animate && 'mascot-float',
        hideOnMobile && 'hidden md:block',
        className
      )}
    />
  );
}
