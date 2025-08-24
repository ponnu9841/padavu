"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

type FloatingWhatsAppProps = {
   /** Your full phone number in international format without + or spaces, e.g. 919876543210 */
   phone: string;
   /** Prefilled message (optional). Current page path will be appended by default. */
   message?: string;
   /** Bottom offset in px (safe-area aware) */
   bottom?: number;
   /** Right offset in px (safe-area aware) */
   right?: number;
   /** Show a small unread-like badge */
   showBadge?: boolean;
   /** aria-label override */
   ariaLabel?: string;
};

export default function FloatingWhatsApp({
   phone,
   message,
   bottom = 20,
   right = 20,
   showBadge = false,
   ariaLabel = "Chat on WhatsApp",
}: FloatingWhatsAppProps) {
   const pathname = usePathname();

   const href = useMemo(() => {
      const base = `https://wa.me/${phone}`;
      const text =
         message ??
         `Hi! I'm interested in this page: ${
            typeof window !== "undefined" ? window.location.origin : ""
         }${pathname}`;
      const query = `?text=${encodeURIComponent(text)}`;
      return `${base}${query}`;
   }, [phone, message, pathname]);

   return (
      <div
         className="fixed z-[100]"
         style={{
            // Respect iOS safe areas while allowing custom offsets
            bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottom}px)`,
            right: `calc(env(safe-area-inset-right, 0px) + ${right}px)`,
         }}
      >
         <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="group relative block"
         >
            {/* Button */}
            <span
               className={[
                  "flex h-14 w-14 items-center justify-center rounded-full shadow-lg",
                  "bg-[#25D366] text-white dark:shadow-black/30",
                  "transition-transform duration-200 ease-out hover:scale-105 active:scale-95",
                  "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-background",
               ].join(" ")}
            >
               {/* Inline WhatsApp SVG (no extra deps) */}
               <FaWhatsapp size={25} />
            </span>

            {/* Ping / badge */}
            {showBadge && (
               <>
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white shadow">
                     1
                  </span>
                  <span className="absolute -z-10 -right-1 -top-1 inline-flex h-16 w-16 animate-ping rounded-full bg-[#25D366]/40" />
               </>
            )}
         </Link>
      </div>
   );
}
