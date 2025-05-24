import { Button } from "@/components/ui/button";
import React from "react";

export default function FormAction({
   loading,
   reset,
   setImages,
   showResetButton = true,
   size,
}: {
   loading: boolean;
   reset?: () => void;
   setImages?: React.Dispatch<React.SetStateAction<ExtendedFile[]>>;
   showResetButton?: boolean;
   size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
   const resetForm = () => {
      if (reset) reset();
      if (setImages) setImages([]);
   };
   return (
      <div className="flex space-x-4 my-4">
         {showResetButton && (
            <Button
               type="button"
               variant="destructive"
               onClick={resetForm}
               size={size}
               disabled={loading}
            >
               Reset
            </Button>
         )}
         <Button type="submit" disabled={loading} size={size}>
            {loading ? "Saving" : "Save"}
         </Button>
      </div>
   );
}
