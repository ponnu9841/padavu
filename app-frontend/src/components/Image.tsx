import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type NextImageProps = {
	src?: string;
	alt?: string;
	priority?: boolean;
	className?: string;
	imageClassName?: string;
};

export default function NextImage(props: NextImageProps) {
	const { src, alt = "", className, priority = false, imageClassName } = props;
	return (
		<div className={cn("relative w-full h-full", className)}>
			<Image
				src={src || "/images/placeholder.jpg"}
				fill={true}
				className={cn("object-contain w-full relative", imageClassName)}
				alt={alt}
				sizes="50vw(min-width: 768px) 80vw"
				priority={priority}
			/>
		</div>
	);
}
