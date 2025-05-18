
"use client";

import { motion } from "motion/react";
import React from "react";

export const animations = {
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

export type AnimationType = keyof typeof animations;

export const RenderBackground = () => (
   <div className="absolute inset-0 w-full h-full bg-black/50 z-1" />
);

export const RenderHeading = ({ heading }: { heading: string }) => (
   <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl xl:text-6xl font-bold tracking-wider z-2">
      {heading}
   </h4>
);


export const  RenderElement = ({
	title,
	className,
	variant = "h2",
	animation = "fadeIn",
}: {
	title: string;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	className?: string;
	animation?: AnimationType;
		
}) => {
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
