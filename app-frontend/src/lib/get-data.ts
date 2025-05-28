import axiosInstance from "./axios";

let cachedBanners: Banner[] | null = null;
let cachedExperts: Experts[] | null = null;
let cachedPackages: PackagesData[] | null = null;
let cachedAboutData: About | null = null;
let cachedMissionData: Mission | null = null;
let cachedVisionData: Vision | null = null;
let cachedClientData: Client[] | null = null;
let cachedWorksData: WorksResponse | null = null;
let cachedTestimonialsData: Testimonial[] | null = null;
let cachedProductsData: Product[] | null = null;
let cachedBlogData: BlogResponse | null = null;

export async function getBannersResponse(): Promise<Banner[] | null> {
   try {
      if (!cachedBanners) {
         const response = await axiosInstance.get("/banners");
         cachedBanners = response.data.data;
      }
      return cachedBanners || [];
   } catch (error) {
      console.error("Error fetching banners:", error);
      return null;
   }
}

export async function getExpertsResponse(): Promise<Experts[] | null> {
   try {
      if (!cachedExperts) {
         const response = await axiosInstance.get("/experts");
         cachedExperts = response.data.data;
      }
      return cachedExperts || [];
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getPackagesResponse(): Promise<PackagesData[] | null> {
   try {
      if (!cachedPackages) {
         const response = await axiosInstance.get("/packages");
         cachedPackages = response.data.data;
      }
      return cachedPackages || [];
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getAboutResponse(): Promise<About | null> {
   try {
      if (!cachedAboutData) {
         const response = await axiosInstance.get("/about");
         cachedAboutData = response.data.data;
      }
      return cachedAboutData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getMissionResponse(): Promise<Mission | null> {
   try {
      if (!cachedMissionData) {
         const response = await axiosInstance.get("/mission");
         cachedMissionData = response.data.data;
      }
      return cachedMissionData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getVisionResponse(): Promise<Vision | null> {
   try {
      if (!cachedVisionData) {
         const response = await axiosInstance.get("/vision");
         cachedVisionData = response.data.data;
      }
      return cachedVisionData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getClientsResponse(): Promise<Client[] | null> {
   try {
      if (!cachedClientData) {
         const response = await axiosInstance.get("/clients");
         cachedClientData = response.data.data;
      }
      return cachedClientData || [];
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getWorksResponse(): Promise<WorksResponse | null> {
   try {
      if (!cachedWorksData) {
         const response = await axiosInstance.get("/works");
         cachedWorksData = response.data.data;
      }
      return cachedWorksData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getTestimonialsResponse(): Promise<Testimonial[] | null> {
   try {
      if (!cachedTestimonialsData) {
         const response = await axiosInstance.get("/testimonials");
         cachedTestimonialsData = response.data.data;
      }
      return cachedTestimonialsData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getProductsResponse(): Promise<Product[] | null> {
   try {
      if (!cachedProductsData) {
         const response = await axiosInstance.get("/products");
         cachedProductsData = response.data.data;
      }
      return cachedProductsData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getBlogsResponse(): Promise<BlogResponse | null> {
   try {
      if (!cachedBlogData) {
         const response = await axiosInstance.get("/blogs");
         cachedBlogData = response.data.data;
      }
      return cachedBlogData || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

export async function getExpertsById(id: string): Promise<Experts | null> {
   try {
      const response = await axiosInstance.get(`/experts/${id}`);
      return response.data.data || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}
