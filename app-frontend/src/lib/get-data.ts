import axiosInstance from "./axios";

let cachedBanners: Banner[] | null = null;
let cachedExperts: Experts[] | null = null;
let cachedPackages: PackagesData[] | null = null;

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
