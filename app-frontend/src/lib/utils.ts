import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { contactData as ContactData } from "./constants";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
   if (!str) return str;
   return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPages() {
   return ["expertism", "packages", "about", "clients", "works", "products", "contact"];
}

export function getCurrentPageBanner(banners: PagesBanner[], page: string) {
   return banners?.find((banner) => banner.page === page);
}

export function getCurrentMetaTag(metaTags: Seo[] | null, page: string) {
   return metaTags?.find((metaTag) => metaTag.page === page);
}

export function formatDateToMonthYear(dateString: string) {
   // Create a new Date object from the input string
   const date = new Date(dateString);

   // Define an array of short month names
   const shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   // Extract the month and year
   const month = shortMonths[date.getMonth()];
   const year = date.getFullYear();
   const day = `0${date.getDate()}`.slice(-2);

   // Return the formatted string
   // return `${month} ${year}`;
   return `${day} ${month} ${year}`;
}

export const isEven = (num: number): boolean => num % 2 === 0;

export const getContact = (contact: Contact) => {
   let contactData = ContactData;
   contactData = [
      {
         title: "Give Us A Call",
         icon: "/icons/message.svg",
         line1: `+91 ${contact.contactno_one}`,
         line2: contact.contactno_two ? `+91 ${contact.contactno_two}` : "",
      },
      {
         title: "Help Desk",
         icon: "/icons/help.svg",
         line1: contact.email_one,
         line2: contact.email_two || "",
      },
      {
         title: "Our Locations",
         icon: "/icons/map.svg",
         line1: contact.location,
         line2: "",
      },
   ];
   return contactData;
};

// lib/seo.ts
import { Metadata } from "next";
import { getSeoTagsResponse } from "./get-data";

export async function generatePageMetadata(pageKey: string): Promise<Metadata> {
   const metaTags = await getSeoTagsResponse();
   const currentMetaTag = getCurrentMetaTag(metaTags, pageKey);

   return {
      title: currentMetaTag?.title || "Default Title",
      description:
         currentMetaTag?.description || "Default description for the site.",
   };
}
