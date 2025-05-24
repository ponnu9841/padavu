import { z } from "zod";

export const fileSchema = (
   minFiles = 1,
   maxFiles = 10,
   errorMessage = "Invalid file"
) =>
   z
      .array(
         z.custom<ExtendedFile>(
            (file) =>
               file instanceof File &&
               "url" in file &&
               typeof (file as ExtendedFile).url === "string",
            { message: errorMessage }
         )
      )
      .min(minFiles, "Image is required")
      .max(maxFiles, `You can upload up to ${maxFiles} files`);

export const loginSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at least 6 characters"),
});

export const bannerSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
   })
   .refine((data) => (data.id ? true : data.image && data.image.length >= 1), {
      message: "Image is required",
      path: ["image"],
   });

export const packageSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
         .string()
         .min(3, "Description must be at least 3 characters"),
      longDescription: z.string().optional(),
      price: z.string().min(1, "Price is required"),
   })
   .refine((data) => (data.id ? true : data.image && data.image.length >= 1), {
      message: "Image is required",
      path: ["image"],
   });

export const clientSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
   })
   .refine((data) => (data.id ? true : data.image && data.image.length >= 1), {
      message: "Image is required",
      path: ["image"],
   });

export const workSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
   })
   .refine((data) => (data.id ? true : data.image && data.image.length >= 1), {
      message: "Image is required",
      path: ["image"],
   });

export const testimonialSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      name: z.string().min(3, "Name must be at least 3 characters"),
      designation: z.string().optional(),
      testimonial: z.string().min(10, "Testimonial must be at least 3 characters"),
   })
   .refine((data) => (data.id ? true : data.image && data.image.length >= 1), {
      message: "Image is required",
      path: ["image"],
   });

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

export type WorkFormData = z.infer<typeof workSchema>;

export type ClientFormData = z.infer<typeof clientSchema>;

export type PackageFormData = z.infer<typeof packageSchema>;

export type BannerFormData = z.infer<typeof bannerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
