/** Strong ease-out — UI entrances and feedback (Emil / animations.dev) */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Strong ease-in-out — on-screen movement */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const DEMO_STAGGER_MS = 0.05;
export const DEMO_ENTER_MS = 0.28;
export const DEMO_SCROLL_ENTER_MS = 0.25;

export const demoFadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * DEMO_STAGGER_MS,
      duration: DEMO_ENTER_MS,
      ease: EASE_OUT,
    },
  }),
};

export const demoScrollReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * DEMO_STAGGER_MS,
      duration: DEMO_SCROLL_ENTER_MS,
      ease: EASE_OUT,
    },
  }),
};

export const demoFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
};