"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("py-10 md:py-16", className)}
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
