"use client"

import { motion } from "motion/react";
import React from "react";

type AnimationProp = {
   children: React.ReactNode;
   className?: string;
};

export type AnimationType = keyof typeof animations;

const animations = {
   fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
   fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
   },
   fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
   },
   zoomIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
   },
   slideInLeft: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
   },
   slideInRight: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
   },
};

export function ExitAnimation({ children, className }: AnimationProp) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0 }}
         transition={{ duration: 0.5 }}
         className={className}
      >
         {children}
      </motion.div>
   );
}

export function EnterAnimation({ children, className }: AnimationProp) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{
            duration: 0.4,
            // delay: 1,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
         }}
         className={className}
      >
         {children}
      </motion.div>
   );
}

export function AnimateElement({
   children,
   className,
   animation = "fadeIn",
   delay = 0,
   duration = 0.5,
}: AnimationProp & {
   animation?: AnimationType;
   delay?: number;
   duration?: number;
}) {
   const selectedAnimation = animations[animation];
   return (
      <motion.div
         initial={selectedAnimation.initial}
         animate={selectedAnimation.animate}
         transition={{ duration, delay }}
         className={className}
      >
         {children}
      </motion.div>
   );
}

export function RenderElement({
   title,
   className,
   variant = "h2",
   animation = "fadeIn",
}: {
   title: string;
   variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
   className?: string;
   animation?: AnimationType;
}) {
   const selectedAnimation = animations[animation];
   return React.createElement(
      motion[variant],
      {
         className,
         initial: selectedAnimation.initial,
         whileInView: selectedAnimation.animate,
         transition: { duration: 1.5, ease: "easeOut" },
      },
      title
   );
}
