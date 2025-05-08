export const RenderBackground = () => (
   <div className="absolute inset-0 w-full h-full bg-black/50 z-1" />
);

export const RenderHeading = ({ heading }: { heading: string }) => (
   <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold tracking-wider z-2">
      {heading}
   </h4>
);
