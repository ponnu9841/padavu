import AnimateText from "@/components/animation/animate-text";
import NextImage from "@/components/Image";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

export interface ContactCardProps {
   icon: string;
   title: string;
   line1?: string;
   line2?: string | null;
}

export default function ContactCard(props: ContactCardProps) {
   const { icon, title, line1, line2 } = props;
   return (
      <>
         <CardContent>
            <div className="flex space-x-6">
               <div>
                  <NextImage
                     src={icon}
                     className="aspect-square min-w-[50px] max-h-[50px]"
                  />
               </div>
               <div>
                  <CardTitle>
                     <AnimateText text={title} />
                  </CardTitle>
                  <CardDescription className="text-base mt-3">
                     {line1 && (
                        <div className="break-all whitespace-pre-line">
                           {line1}
                        </div>
                     )}
                     {line2 && (
                        <div className="whitespace-pre-line">{line2}</div>
                     )}
                  </CardDescription>
               </div>
            </div>
         </CardContent>
      </>
   );
}
