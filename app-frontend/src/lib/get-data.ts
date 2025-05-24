// lib/api-services.ts
import axiosInstance from "./axios";

// Individual data fetchers with caching
// let cachedContactData: Contact[] | null = null;
// let cachedPartners: Partner[] | null = null;
// let cachedServices: Service[] | null = null;
let cachedBanners: Banner[] | null = null;
// let cachedAbout: About | null = null;
// let cachedHeadings: Heading[] | null = null;
// let cachedMetaTags: Seo[] | null = null;
// let cachedPolicies: Policy[] | null = null;

export async function getBannersResponse(): Promise<Banner[]> {
   try {
      if (!cachedBanners) {
         const response = await axiosInstance.get("/banners");
         cachedBanners = response.data.data;
      }
      return cachedBanners || [];
   } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
   }
}

// export async function getPartnersResponse(): Promise<Partner[]> {
//    try {
//       // if (!cachedPartners) {
//       const response = await axiosClient.get("/partner");
//       return response.data.data;
//       // }
//       // return cachedPartners || [];
//    } catch (error) {
//       console.error("Error fetching partners:", error);
//       return [];
//    }
// }

// export async function getServicesResponse(): Promise<Service[]> {
//    try {
//       // if (!cachedServices) {
//       const response = await axiosClient.get("/service");
//       return response.data.data;
//       // }
//       // return cachedServices || [];
//    } catch (error) {
//       console.error("Error fetching services:", error);
//       return [];
//    }
// }

// export async function getContactDataResponse(): Promise<Contact[] | null> {
//    try {
//       // if (!cachedContactData) {
//       const response = await axiosClient.get("/contact");
//       return response.data.data;
//       // }
//       // return cachedContactData;
//    } catch (error) {
//       console.error("Error fetching contact data:", error);
//       return null;
//    }
// }

// export async function getAboutDataResponse(): Promise<About | null> {
//    try {
//       // if (!cachedAbout) {
//       const response = await axiosClient.get("/about");
//       return response.data.data;
//       // }
//       // return cachedAbout;
//    } catch (error) {
//       console.error("Error fetching about data:", error);
//       return null;
//    }
// }

// export async function getHeadingsResponse(): Promise<Heading[]> {
//    try {
//       // if (!cachedHeadings) {
//       const response = await axiosClient.get("/heading");
//       return response.data.data;
//       // }
//       // return cachedHeadings || [];
//    } catch (error) {
//       console.error("Error fetching headings:", error);
//       return [];
//    }
// }

// export async function getMetaTagsResponse(): Promise<Seo[]> {
//    try {
//       // if (!cachedMetaTags) {
//       const response = await axiosClient.get("/seoTags");
//       return response.data.data;
//       // }
//       // return cachedMetaTags || [];
//    } catch (error) {
//       console.error("Error fetching meta tags:", error);
//       return [];
//    }
// }

// export async function getPoliciesResponse(): Promise<Policy[]> {
//    try {
//       // if(!cachedPolicies){
//       const response = await axiosClient.get("/policies");
//       return response.data.data;
//       // }
//       // return cachedPolicies || [];
//    } catch (error) {
//       console.error("Error fetching policy:", error);
//       return [];
//    }
// }
