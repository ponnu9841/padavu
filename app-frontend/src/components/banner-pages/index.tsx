import NextImage from "@/components/Image";
import AnimatedTypography from "@/components/animation/animated-typography";

export default function BannerPages({
  image,
  title,
  alt,
}: {
  image: string;
  title?: string | null;
  alt?: string | null;
}) {
  return (
    <div className="relative">
      <NextImage
        src={image}
        imageClassName="object-cover"
        className="w-full min-h-[60vh]"
        alt={alt || ""}
      />
      <div className="absolute inset-0 w-full h-full bg-black/40"></div>
      {title && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AnimatedTypography
            text={title}
            className="text-white font-bold tracking-wider"
            variant="h1"
          />
        </div>
      )}
    </div>
  );
}
