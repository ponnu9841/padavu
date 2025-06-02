import axios from "axios";
const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
   timeout: 30000,
   withCredentials: true,
});

// export async function getBannersResponse(): Promise<Banner[] | null> {
//    try {
//       const response = await axiosInstance.get("/banners");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching banners:", error);
//       return null;
//    }
// }

// export async function getExpertsResponse(): Promise<Experts[] | null> {
//    try {
//       const response = await axiosInstance.get("/experts");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getPackagesResponse(): Promise<PackagesData[] | null> {
//    try {
//       const response = await axiosInstance.get("/packages");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getAboutResponse(): Promise<About | null> {
//    try {
//       const response = await axiosInstance.get("/about");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getMissionResponse(): Promise<Mission | null> {
//    try {
//       const response = await axiosInstance.get("/mission");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getVisionResponse(): Promise<Vision | null> {
//    try {
//       const response = await axiosInstance.get("/vision");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getClientsResponse(): Promise<Client[] | null> {
//    try {
//       const response = await axiosInstance.get("/clients");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getWorksResponse(): Promise<WorksResponse | null> {
//    try {
//       const response = await axiosInstance.get("/works");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getTestimonialsResponse(): Promise<Testimonial[] | null> {
//    try {
//       const response = await axiosInstance.get("/testimonials");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getProductsResponse(): Promise<Product[] | null> {
//    try {
//       const response = await axiosInstance.get("/products");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getBlogsResponse(): Promise<BlogResponse | null> {
//    try {
//       const response = await axiosInstance.get("/blogs");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

export async function getExpertsById(id: string): Promise<Experts | null> {
   try {
      const response = await axiosInstance.get(`/experts/${id}`);
      return response.data.data || null;
   } catch (error) {
      console.error("Error fetching experts:", error);
      return null;
   }
}

// export async function getExpertsData(): Promise<Experts[] | null> {
//    try {
//       const response = await axiosInstance.get("/experts");
//       return response.data.data || [];
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getPagesBannersResponse(): Promise<PagesBanner[] | null> {
//    try {
//       const response = await axiosInstance.get("/pagesBanner");
//       return response.data.data;
//    } catch (error) {
//       console.error("Error fetching experts:", error);
//       return null;
//    }
// }

// export async function getPackagesData(): Promise<PackagesData[] | null> {
//    try {
//       const response = await axiosInstance.get("/packages");
//       return response.data.data || [];
//    } catch (error) {
//       console.error("Error fetching packages:", error);
//       return null;
//    }
// }

export async function getPackageById(id: string): Promise<PackagesData | null> {
   try {
      const response = await axiosInstance.get(`/packages/${id}`);
      return response.data.data || null;
   } catch (error) {
      console.error("Error fetching package:", error);
      return null;
   }
}

export async function getProductById(id: string): Promise<Product | null> {
   try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data.data || null;
   } catch (error) {
      console.error("Error fetching product:", error);
      return null;
   }
}


async function fetchData<T>(url: string): Promise<T | null> {
   try {
      const response = await axiosInstance.get(url);
      return response.data.data;
   } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
   }
}

export const getExpertsResponse = () => fetchData<Experts[]>("/experts");
export const getBannersResponse = () => fetchData<Banner[]>("/banners");
export const getPagesBannersResponse = () => fetchData<PagesBanner[]>("/pagesBanner");
export const getPackagesResponse = () => fetchData<PackagesData[]>("/packages");
export const getAboutResponse = () => fetchData<About>("/about");
export const getMissionResponse = () => fetchData<Mission>("/mission");
export const getVisionResponse = () => fetchData<Vision>("/vision");
export const getClientsResponse = () => fetchData<Client[]>("/clients");
export const getWorksResponse = () => fetchData<WorksResponse>("/works");
export const getTestimonialsResponse = () => fetchData<Testimonial[]>("/testimonials");
export const getProductsResponse = () => fetchData<Product[]>("/products");
export const getBlogsResponse = () => fetchData<BlogResponse>("/blogs");