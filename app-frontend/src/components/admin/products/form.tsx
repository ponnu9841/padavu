import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { productSchema, ProductsFormData } from "@/schema";
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
import {
   fetchProducts,
   setSelectedProduct,
} from "@/store/features/products-slice";

const defaultValues = {
   id: "",
   image: [],
   imageAlt: "",
   title: "",
   description: "",
};

export default function ProductsForm() {
   const form = useForm<ProductsFormData>({
      resolver: zodResolver(productSchema),
      defaultValues,
   });

   const dispatch = useAppDispatch();
   const selectedPackage = useAppSelector(
      (state) => state.packages.selectedPackage
   );
   const [loading, setLoading] = useState(false);
   const [existingImage, setExistingImage] = useState("");

   const onSubmit = (data: ProductsFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("alt", data.imageAlt || "");
      form.append("title", data.title || "");
      form.append("description", data.description || "");
      form.append("existingImage", existingImage);
      if (data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.id) form.append("id", data.id);
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/products", form)
         .then((response) => {
            if (response.status === 200) {
               dispatch(fetchProducts());
               resetForm();
            }
         })
         .finally(() => setLoading(false));
   };

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
      dispatch(setSelectedProduct(null));
   };

   useEffect(() => {
      if (selectedPackage) {
         form.reset({
            id: selectedPackage.id,
            image: [],
            imageAlt: selectedPackage.alt || "",
            title: selectedPackage.title,
            description: selectedPackage.description || "",
         });
         setExistingImage(selectedPackage.image);
      }
   }, [selectedPackage]); //eslint-disable-line

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            <div className="space-y-4 mt-4">
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
            <FormAction reset={resetForm} loading={loading} />
         </form>
      </Form>
   );
}
