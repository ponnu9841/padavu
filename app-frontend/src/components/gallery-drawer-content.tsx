import React from "react";
import Image from "next/image";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImagesProps = {
	images: Work[];
	selectedImage: string;
	setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
	arrayLength?: number;
	currentIndex?: number;
};

export default function GalleryDrawerContent(props: GalleryImagesProps) {
	const { selectedImage, setSelectedImage, images } = props;

	const navigateImage = (direction: "next" | "prev") => {
		if (selectedImage === null) return;
		const currentIndex = images.findIndex((img) => img.id === selectedImage);
		const newIndex =
			direction === "next"
				? (currentIndex + 1) % images.length
				: (currentIndex - 1 + images.length) % images.length;
		setSelectedImage(images[newIndex].id);
	};

	const currentImage = images.find((im) => im.id === selectedImage)

	return (
		<>
			{selectedImage && (
				<div className="relative w-full h-full">
					<DialogTitle
						aria-describedby=""
						className="text-center relative z-10 mt-2"
					>
						{currentImage?.alt}
					</DialogTitle>
					<Image
						src={currentImage?.image || "/no-image.png"}
						alt={currentImage?.alt || "/no-image.png"}
						fill
						className="object-contain"
						priority
					/>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-1/2 left-4 transform -translate-y-1/2 text-foreground"
						onClick={() => navigateImage("prev")}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-1/2 right-4 transform -translate-y-1/2 text-foreground"
						onClick={() => navigateImage("next")}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</>
	);
}
