import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Trash, Upload } from "lucide-react";
import { Input } from "../ui/input";
import NextImage from "../Image";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageUploadPropsType = {
   files: ExtendedFile[] | [];
   setFiles: React.Dispatch<React.SetStateAction<ExtendedFile[] | []>>;
   existingImage?: string;
   multiple?: boolean;
   isVideo?: boolean;
   placeholder?: string;
   error?: string;
};

const FileUpload = ({
   files,
   setFiles,
   existingImage,
   multiple = false,
   isVideo = false,
   placeholder,
   error,
}: ImageUploadPropsType) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [selectedFiles, setselectedFiles] = useState<string[]>([]);
   const [dragActive, setDragActive] = useState(false);

   useEffect(() => {
      if (files.length === 0) setselectedFiles([]);
      else setselectedFiles(files.map((image) => image.url));
   }, [files]);

   const handleFiles = (fileList: FileList) => {
      const filesArr = Array.from(fileList) as ExtendedFile[];

      if (multiple) {
         filesArr.forEach((file) => {
            const url = URL.createObjectURL(file);
            file.url = url;
            setFiles((prev) => [...prev, file]);
         });
      } else if (filesArr.length > 0) {
         if (selectedFiles.length > 0) URL.revokeObjectURL(selectedFiles[0]);
         const url = URL.createObjectURL(filesArr[0]);
         filesArr[0].url = url;
         setFiles([filesArr[0]]);
      }
   };

   const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         handleFiles(event.target.files);
      }
      event.target.value = "";
   };

   const deleteHandler = (url: string) => {
      setFiles(files.filter((file) => file.url !== url));
      setselectedFiles((previousUrls) =>
         previousUrls.filter((image) => image !== url)
      );
      URL.revokeObjectURL(url);
   };

   const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(e.type === "dragenter" || e.type === "dragover");
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         handleFiles(e.dataTransfer.files);
         e.dataTransfer.clearData();
      }
   };

   useEffect(() => {
      return () => {
         if (selectedFiles.length > 0) {
            selectedFiles.forEach((url) => URL.revokeObjectURL(url));
         }
      };
   }, [selectedFiles]);

   let inputClassName = "text-gray-400 group-hover:text-gray-600";
   if (error) inputClassName = "text-red-500";

   return (
      <div className="flex flex-col items-center gap-2">
         {selectedFiles.length < 10 && (
            <div
               className={cn(
                  "flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none",
                  error && "border-red-500",
                  dragActive && "border-blue-500 bg-blue-50"
               )}
               onDragEnter={handleDrag}
               onDragOver={handleDrag}
               onDragLeave={handleDrag}
               onDrop={handleDrop}
            >
               <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                     <Upload className={cn("w-7 h-7", inputClassName)} />
                     <p
                        className={cn(
                           "pt-1 text-sm tracking-wider",
                           inputClassName
                        )}
                     >
                        {placeholder || "Upload File or Drag & Drop"}
                     </p>
                  </div>
                  <Input
                     id="file-upload"
                     type="file"
                     className="hidden"
                     onChange={onSelectFile}
                     multiple
                     accept={isVideo ? "video/*" : "image/*"}
                     ref={inputRef}
                  />
               </label>
            </div>
         )}

         {selectedFiles?.length >= 10 && (
            <div className="text-red-500 py-3">
               You can`t upload more than 10 files!
            </div>
         )}

         {selectedFiles.length > 0 ? (
            <div className="mt-3 flex items-center gap-3 flex-wrap max-h-[200px] overflow-y-auto">
               {selectedFiles?.map((file: string) => (
                  <div
                     key={file}
                     className="relative flex items-center justify-center"
                  >
                     {isVideo ? (
                        <div className="max-h-[150px] w-full">
                           <iframe src={file} className="max-h-full" />
                        </div>
                     ) : (
                        <NextImage
                           src={file}
                           className="min-w-40 aspect-square max-w-full max-h-[100px] object-cover"
                           alt="upload"
                        />
                     )}

                     <div className="absolute top-0 right-0 bg-red-500 rounded-full flex items-center justify-center">
                        <Button
                           aria-label="delete"
                           size="icon"
                           onClick={() => deleteHandler(file)}
                           type="button"
                        >
                           <Trash />
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         ) : existingImage ? (
            <Image src={existingImage} width={100} height={100} alt="upload" />
         ) : (
            <></>
         )}
      </div>
   );
};

export default FileUpload;
