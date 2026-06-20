/** Strong ease-out — UI entrances and feedback */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Strong ease-in-out — on-screen movement */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const STAGGER_MS = 0.05;
export const ENTER_MS = 0.26;
export const SCROLL_ENTER_MS = 0.24;
export const EXIT_MS = 0.14;

/** Hardware-accelerated entrance — prefer transform over Framer y/x */
export const enterUp = (y = 8) => ({
  opacity: 0,
  transform: `translateY(${y}px)`,
});

export const enterUpVisible = {
  opacity: 1,
  transform: "translateY(0px)",
};

export const fadeUp = {
  hidden: enterUp(8),
  visible: (i: number) => ({
    ...enterUpVisible,
    transition: {
      delay: i * STAGGER_MS,
      duration: ENTER_MS,
      ease: EASE_OUT,
    },
  }),
};

export const scrollReveal = {
  hidden: enterUp(8),
  visible: (i: number) => ({
    ...enterUpVisible,
    transition: {
      delay: i * STAGGER_MS,
      duration: SCROLL_ENTER_MS,
      ease: EASE_OUT,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
};

export const itemVariants = {
  hidden: enterUp(8),
  visible: {
    ...enterUpVisible,
    transition: { duration: SCROLL_ENTER_MS, ease: EASE_OUT },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER_MS, delayChildren: 0.04 },
  },
};