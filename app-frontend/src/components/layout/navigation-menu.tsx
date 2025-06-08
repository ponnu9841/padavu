"use client";

import {
   Sheet,
   SheetContent,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const navItems = [
   { name: "Home", link: "/" },
   { name: "Expertism", link: "/experts" },  
   { name: "Packages", link: "/packages" },
   { name: "About", link: "/about" },
   { name: "Clients", link: "/clients" },
   { name: "Works", link: "/works" },
   { name: "Products", link: "/products" },
   { name: "Blog", link: "/blog" },
   { name: "Contact", link: "/contact" },
];

export default function NavigationMenu() {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <SheetTrigger asChild>
            <button>
               <Menu className="h-6 w-6 cursor-pointer" />
               <span className="sr-only">Open main menu</span>
            </button>
         </SheetTrigger>
         <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px]"
            aria-describedby={undefined}
         >
            <SheetTitle aria-describedby={undefined}></SheetTitle>
            <div className="flex flex-col gap-4 py-10">
               {navItems.map((item) => (
                  <Link
                     key={item.name}
                     href={item.link}
                     className="text-foreground/80 hover:primary hover:bg-primary/20 rounded block mx-10 p-3 text-base font-medium"
                     onClick={() => setIsOpen(false)}
                  >
                     {item.name}
                  </Link>
               ))}
            </div>
         </SheetContent>
      </Sheet>
   );
}
