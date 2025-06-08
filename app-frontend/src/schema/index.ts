import { z } from "zod";

const requireImageIfNoId = {
   message: "Image is required",
   path: ["image"],
   condition: (data: { id?: string; image?: ExtendedFile[] }) =>
      !!data.id?.trim() || (data.image?.length ?? 0) >= 1,
};

export const fileSchema = (errorMessage = "Invalid Image") =>
   z.array(
      z.custom<ExtendedFile>(
         (file) =>
            file instanceof File &&
            "url" in file &&
            typeof (file as ExtendedFile).url === "string",
         { message: errorMessage }
      )
   );

// export const fileSchema = (
//    minFiles = 1,
//    maxFiles = 10,
//    errorMessage = "Invalid file"
// ) =>
//    z
//       .array(
//          z.custom<ExtendedFile>(
//             (file) =>
//                file instanceof File &&
//                "url" in file &&
//                typeof (file as ExtendedFile).url === "string",
//             { message: errorMessage }
//          )
//       )
//       .min(minFiles, "Image is required")
//       .max(maxFiles, `You can upload up to ${maxFiles} files`);

export const loginSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string().min(6, "Password must be at least 6 characters"),
});

export const bannerSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema().optional(),
      imageAlt: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
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
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const clientSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const workSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const testimonialSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      name: z.string().min(3, "Name must be at least 3 characters"),
      designation: z.string().optional(),
      testimonial: z
         .string()
         .min(10, "Testimonial must be at least 3 characters"),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const expertsSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema().optional(),
      imageAlt: z.string().optional(),
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
         .string()
         .min(10, "Description must be at least 3 characters"),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const productSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().min(3, "Title must be at least 3 characters"),
      description: z
         .string()
         .min(10, "Description must be at least 3 characters"),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const blogSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      title: z.string().min(3, "Name must be at least 3 characters"),
      content: z.string().min(3, "Content must be at least 3 characters"),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const aboutSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      shortDescription: z
         .string()
         .min(10, "Content must be at least 3 characters"),
      longDescription: z.string().optional(),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const missionSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      imageAlt: z.string().optional(),
      description: z.string().min(10, "Content must be at least 3 characters"),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const headingSchema = z.object({
   id: z.string().optional(),
   title: z.string().min(3, "Title must be at least 3 characters"),
   description: z.string().optional(),
   section: z.string(),
});

export const pagesBannerSchema = z
   .object({
      id: z.string().optional(),
      image: fileSchema(),
      title: z.string().optional(),
      alt: z.string().optional(),
      page: z.string(),
   })
   .refine(requireImageIfNoId.condition, {
      message: requireImageIfNoId.message,
      path: requireImageIfNoId.path,
   });

export const seoSchema = z.object({
   id: z.string().optional(),
   title: z.string().min(3, "Title must be at least 3 characters"),
   description: z.string().min(3, "Title must be at least 3 characters"),
   page: z.string(),
});

export const contactSchema = z.object({
   id: z.string().optional(),
   location: z.string().min(3, "Location must be at least 3 characters"),
   contactOne: z.string().regex(/^\d{10}$/, {
      message: "Phone number must be exactly 10 digits",
   }),
   contactTwo: z.string().optional(),
   emailOne: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
   emailTwo: z.string().optional(),
   map: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type SeoFormData = z.infer<typeof seoSchema>;

export type PagesBannerFormData = z.infer<typeof pagesBannerSchema>;

export type HeadingFormData = z.infer<typeof headingSchema>;

export type VissionFormData = z.infer<typeof missionSchema>;

export type MissionFormData = z.infer<typeof missionSchema>;

export type AboutFormData = z.infer<typeof aboutSchema>;

export type BlogFormData = z.infer<typeof blogSchema>;

export type ProductsFormData = z.infer<typeof productSchema>;

export type ExpertsFormData = z.infer<typeof expertsSchema>;

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

export type WorkFormData = z.infer<typeof workSchema>;

export type ClientFormData = z.infer<typeof clientSchema>;

export type PackageFormData = z.infer<typeof packageSchema>;

export type BannerFormData = z.infer<typeof bannerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
