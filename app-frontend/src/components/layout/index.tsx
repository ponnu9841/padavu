import { ReactNode } from "react";
import NavigationMenu from "./navigation-menu";
import NextImage from "@/components/Image";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <>
         <header className="bg-primary text-background p-4 sticky top-0 z-100 shadow h-25 flex items-center">
            <div className="container flex justify-between items-center">
               <Link href="/" className="text-2xl font-bold">
                  <NextImage src="/images/logo.webp" className="aspect-[3/1] w-50 max-h-25" />
               </Link>
               <NavigationMenu />
            </div>
         </header>
         {children}
         <footer className="mt-4 container">
            <h2 className="text-center">Contacts</h2>
            <div className="my-4 flex flex-wrap justify-between">
               <div>
                  <h4 className="mb-2 text-2xl">Head Office</h4>
                  <div className="white-space-pre-line text-xl leading-6.5">
                     1722, 7th Floor
                     <br />
                     Hilite Business park,
                     <br />
                     Kozhikode, Kerala, 673014,
                     <br />
                     +91 9447659144
                  </div>
               </div>
               <div>
                  <div className="md:text-right">
                     <h4 className="mb-2 text-2xl">Production Unit</h4>
                     <div className="white-space-pre-line text-xl leading-6.5">
                        Mukkam Gothampuroad<br />
                        Kerala 673602 <br />
                        +91 94476 59144
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </>
   );
}
