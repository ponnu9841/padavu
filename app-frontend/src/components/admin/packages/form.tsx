import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { PackageFormData, packageSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormAction from "../form-action";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";
import TextEditor from "@/components/text-editor";
import { fetchPackage } from "@/store/features/packages-slice";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   title: "",
   description: "",
   longDescription: "",
   price: "",
};

export default function PackagesForm() {
   const form = useForm<PackageFormData>({
      resolver: zodResolver(packageSchema),
      defaultValues,
   });
   const { register } = form;

   const dispatch = useAppDispatch();
   const selectedPackage = useAppSelector(
      (state) => state.packages.selectedPackage
   );
   const [loading, setLoading] = useState(false);
   const [existingImage, setExistingImage] = useState("");

   const onSubmit = (data: PackageFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("alt", data.imageAlt || "");
      form.append("title", data.title || "");
      form.append("description", data.description || "");
      form.append("long_description", data.longDescription || "");
      form.append("price", data.price);
      form.append("existingImage", existingImage);
      if (data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.id) form.append("id", data.id);
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/packages", form)
         .then((response) => {
            if (response.status === 200) {
               dispatch(fetchPackage());
               resetForm();
            }
         })
         .catch((error) => {
            console.log(error);
         })
         .finally(() => setLoading(false));
   };

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
   };

   useEffect(() => {
      if (selectedPackage) {
         form.reset({
            id: selectedPackage.id,
            image: [],
            imageAlt: selectedPackage.alt || "",
            title: selectedPackage.title,
            description: selectedPackage.description,
            longDescription: selectedPackage.long_description || "",
            price: selectedPackage.price,
         });
         setExistingImage(selectedPackage.image);
      }
   }, [selectedPackage]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div className="mt-4">
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
            </div>

            {form.watch("image").length > 0 && (
               <div className="mt-4">
                  <FormField
                     control={form.control}
                     name="imageAlt"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Image Alt</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="text"
                                 placeholder="Image Alt"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            )}

            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                           <Input {...field} placeholder="Enter Title" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <TextEditor
                              placeholder="Enter description"
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
            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Long Description</FormLabel>
                        <FormControl>
                           <TextEditor
                              placeholder="Enter long description"
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
            <div className="mt-4">
               <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              type="text"
                              placeholder="Enter Price"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <FormAction reset={resetForm} loading={loading} />
         </form>
      </Form>
   );
}
