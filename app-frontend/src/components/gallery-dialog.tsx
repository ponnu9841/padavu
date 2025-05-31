import { Dialog, DialogContent } from "@/components/ui/dialog";
import GalleryDrawerContent from "@/components/gallery-drawer-content";
import { Dispatch, SetStateAction } from "react";

type GalleryDialogProps = {
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  images: Work[];
//   openDialog: (id: string) => void;
};

export default function GalleryDialog(props: GalleryDialogProps) {
  const { selectedImage, images, setSelectedImage } = props;
  const closeDialog = () => setSelectedImage(null);

  return (
    <Dialog open={selectedImage !== null} onOpenChange={closeDialog}>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full p-5 text-white bg-transparent border-none">
        {selectedImage && images && (
          <GalleryDrawerContent
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
