import FileUpload from "@/components/file-upload";
import TextEditor from "@/components/text-editor";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import axiosInstance from "@/lib/axios";
import { missionSchema, VissionFormData } from "@/schema";
import { fetchVision } from "@/store/features/about-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   description: "",
};

export default function VisionForm() {
   const form = useForm<VissionFormData>({
      resolver: zodResolver(missionSchema),
      defaultValues,
   });

   const dispatch = useAppDispatch();
   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);
   const vision = useAppSelector((state) => state.about.vision);

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
   };

   const onSubmit = (data: VissionFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("alt", data.imageAlt || "");
      form.append("description", data.description);
      form.append("existingImage", existingImage || "");
      if (data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.id) {
         form.append("id", data.id);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/vision", form)
         .then((response) => {
            if (response.status === 200) {
               successCB();
            }
         })
         .catch((error) => {
            console.log(error);
            setLoading(false);
         })
         .finally(() => setLoading(false));

      function successCB() {
         resetForm();
         dispatch(fetchVision());
      }
   };

   useEffect(() => {
      if (vision) {
         form.reset({
            id: vision.id,
            image: [],
            imageAlt: vision.alt || "",
            description: vision.description,
         });
         setExistingImage(vision.image);
      }
   }, [vision]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="image"
                     render={({ field, fieldState: { error } }) => (
                        <FormItem>
                           <FormLabel>Image</FormLabel>
                           <FormControl>
                              <FileUpload
                                 files={field.value}
                                 setFiles={field.onChange}
                                 placeholder="Select Image"
                                 existingImage={existingImage}
                                 error={error?.message}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="imageAlt"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image</FormLabel>
                           <FormControl>
                              <Input {...field} placeholder="Image Alt" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field, fieldState: { error } }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <TextEditor
                                 placeholder="Enter short description"
                                 value={field.value}
                                 setValue={field.onChange}
                                 error={error?.message}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <Button type="submit" disabled={loading} className="mt-4">
               {loading ? "Saving" : "Save"}
            </Button>
         </form>
      </Form>
   );
}
