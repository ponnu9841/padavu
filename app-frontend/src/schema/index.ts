import { z } from "zod";

// Document Schema
// export const DOCUMENT_SCHEMA = z
//   .instanceof(File)
//   .refine(
//     (file) =>
//       [
//         "application/pdf",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ].includes(file.type),
//     { message: "Invalid document file type" }
//   );

export const fileValidation = (val: unknown) => {
	if (val === null) {
		return {
			valid: false,
			issues: [
				{
					code: z.ZodIssueCode.invalid_type,
					message: "Input must be a file",
				},
			],
		};
	}
	if (val instanceof File) {
		return { valid: true, issues: [] };
	}
	return {
		valid: false,
		issues: [
			{
				code: z.ZodIssueCode.invalid_type,
				message: "Input must be a file",
			},
		],
	};
};

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const bannerSchema = z.object({
	id: z.string().optional(),
	imageAlt: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
});

export const partnerSchema = z.object({
	id: z.string().optional(),
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string(),
});

export const serviceSchema = z.object({
	id: z.string().optional(),
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	shortDescription: z.string().min(3, "Title must be at least 3 characters"),
	longDescription: z.string().min(3, "Title must be at least 3 characters"),
});

export const testimonialsSchema = z.object({
	id: z.string().optional(),
	// image: z.custom<File[] | null>(fileValidation),
	videoUrl: z.string().optional(),
	imageAlt: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	designation: z.string().min(3, "Designation must be at least 3 characters"),
	testimonial: z.string().min(3, "Testimonial must be at least 3 characters"),
});

export const gallerySchema = z.object({
	id: z.string().optional(),
	// image: z.custom<File[] | null>(fileValidation),
	imageAlt: z.string().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
});

export const teamsSchema = z.object({
	id: z.string().optional(),
	imageAlt: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	designation: z.string().optional(),
	lindedInProfile: z.string().optional(),
});

export const contactSchema = z.object({
	id: z.string().optional(),
	location: z.string().min(3, "Location must be at least 3 characters"),
	map: z.string().url("This is not a valid URL."),
	contactOne: z.string().regex(/^\d{10}$/, {
		message: "Phone number must be exactly 10 digits",
	}),
	contactTwo: z
		.string()
		.regex(/^\d{10}$/, {
			message: "Phone number must be exactly 10 digits",
		})
		.optional(),
	emailOne: z
		.string()
		.min(1, { message: "This field has to be filled." })
		.email("This is not a valid email."),
	emailTwo: z.string().email("This is not a valid email.").optional(),
});

export const aboutSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	subTitle: z.string().optional(),
	imageOneAlt: z.string().optional(),
	imageTwoAlt: z.string().optional(),
	shortDescription: z.string().min(3, "Description must be at least 3 characters"),
	longDescription: z.string().optional(),
});

export const headingSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().optional(),
	section: z.string()
})

export const pagesBannerSchema = z.object({
	id: z.string().optional(),
	title: z.string().optional(),
	alt: z.string().optional(),
	page: z.string()
});

export const seoSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(3, "Title must be at least 3 characters"),
	page: z.string(),
})

export const policySchema = z.object({
	id: z.string().optional(),
	content: z.string().min(3, "Content must be at least 3 characters"),
	type: z.string(),
})

export const grievanceOfficerSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	contact: z.string().regex(/^\d{10}$/, {
		message: "Phone should be number and exactly 10 digits",
	}),
	designation: z.string().min(3, "Designation must be at least 3 characters"),
	address: z.string().optional(),
})

export const blogSchema = z.object({
	id: z.string().optional(),
	imageAlt: z.string().optional(),
	title: z.string().min(3, "Name must be at least 3 characters"),
	content: z.string().min(3, "Content must be at least 3 characters"),
})

export const careerSchema = z.object({
	id: z.string().optional(),
	imageAlt: z.string().optional(),
	title: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 3 characters"),
	url: z.string().url("This is not a valid URL."),
	buttonTitle: z.string().optional(),
})

export type CareerFormData = z.infer<typeof careerSchema>;

export type BlogFormData = z.infer<typeof blogSchema>;

export type GrievanceOfficerFormData = z.infer<typeof grievanceOfficerSchema>;

export type PolicyFormData = z.infer<typeof policySchema>;

export type SeoFormData = z.infer<typeof seoSchema>;

export type PagesBannerFormData = z.infer<typeof pagesBannerSchema>;

export type HeadingFormData = z.infer<typeof headingSchema>;

export type AboutFormData = z.infer<typeof aboutSchema>;

export type ContactFormData = z.infer<typeof contactSchema>;

export type TeamsFormData = z.infer<typeof teamsSchema>;

export type GalleryFormData = z.infer<typeof gallerySchema>;

export type TestimonialsFormData = z.infer<typeof testimonialsSchema>;

export type ServiceFormData = z.infer<typeof serviceSchema>;

export type PartnerFormData = z.infer<typeof partnerSchema>;

export type BannerFormData = z.infer<typeof bannerSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;
