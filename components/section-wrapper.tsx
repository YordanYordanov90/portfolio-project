"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { containerVariants, itemVariants, enterUp, enterUpVisible, EASE_OUT } from "@/lib/motion";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: boolean;
}

export function SectionWrapper({
  children,
  className,
  delay = 0,
  staggerChildren = false,
  ...props
}: SectionWrapperProps) {
  if (staggerChildren) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className={cn("py-10 md:py-16", className)}
        {...props}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={enterUp(8)}
      whileInView={enterUpVisible}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.26, delay, ease: EASE_OUT }}
      className={cn("section-anchor py-10 md:py-16", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedItem({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { itemVariants };