import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { fetchBlogs } from "@/store/features/blogs-slice";
import { BlogFormData, blogSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import FormAction from "../form-action";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";
import { useForm } from "react-hook-form";
import TextEditor from "@/components/text-editor";

const defaultValues = {
   id: "",
   image: [],
   title: "",
   content: "",
};

export default function BlogsForm() {
   const form = useForm<BlogFormData>({
      resolver: zodResolver(blogSchema),
      defaultValues,
   });

   const dispatch = useAppDispatch();
   const [existingImage, setExistingImage] = useState("");
   const [loading, setLoading] = useState(false);
   const selectedBlog = useAppSelector((state) => state.blogs.selectedBlog);

   const resetForm = () => {
      form.reset(defaultValues);
      setExistingImage("");
   };

   const onSubmit = (data: BlogFormData) => {
      setLoading(true);
      const form = new FormData();
      form.append("title", data.title);
      form.append("content", data.content);
      form.append("alt", data.imageAlt || "");
      form.append("existingImage", existingImage || "");
      if (data.image.length > 0) {
         form.append("image", data.image[0]);
      }
      if (data.imageAlt) {
         form.append("alt", data.imageAlt);
      }
      if (data.id) {
         form.append("id", data.id);
      }
      const method = data.id ? axiosInstance.put : axiosInstance.post;
      method("/blogs", form)
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
         dispatch(fetchBlogs({}));
      }
   };

   useEffect(() => {
      if (selectedBlog) {
         form.reset({
            id: selectedBlog.id,
            image: [],
            title: selectedBlog.title,
            content: selectedBlog.content,
            imageAlt: selectedBlog.alt || "",
         });
         setExistingImage(selectedBlog.image);
      }
   }, [selectedBlog]); //eslint-disable-line

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
                              type="text"
                              placeholder="Image Alt Title"
                              {...field}
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
                           <Input
                              type="text"
                              placeholder="Blog Title"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="content"
                  render={({ field, fieldState: { error } }) => (
                     <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                           <TextEditor
                              placeholder="Enter blog content"
                              value={field.value}
                              setValue={field.onChange}
                              error={error?.message}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormAction reset={() => resetForm()} loading={loading} />
            </div>
         </form>
      </Form>
   );
}
