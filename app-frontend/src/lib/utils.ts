import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPages() {
  return ["expertism", "packages", "about", "clients", "works", "products" ]
}

export function getCurrentPageBanner(banners: PagesBanner[], page: string) {
  return banners?.find((banner) => banner.page === page);
}

export function getCurrentMetaTag(metaTags: Seo[], page: string) {
  return metaTags?.find((metaTag) => metaTag.page === page);
}