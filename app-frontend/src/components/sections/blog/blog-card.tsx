import ZoomAnimation from "@/components/animation/zoom-animation";
import NextImage from "@/components/Image";
import {
   Card,
   CardContent,
   CardDescription,
   CardTitle,
} from "@/components/ui/card";
import { formatDateToMonthYear } from "@/lib/utils";
import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlogCard(props: Blog) {
   const { id, image, title, content, createdAt } = props;
   return (
      <Card className="group border-none">
         <Link href={`/blog/${id}`} className="relative">
            <ZoomAnimation>
               <NextImage
                  src={image}
                  className="aspect-video min-w-full"
                  imageClassName="object-cover"
               />
            </ZoomAnimation>
            <div className="absolute -bottom-4 left-4 bg-primary w-32 group-hover:bg-black text-white px-4 py-1.5 transition ease-in duration-500 flex justify-center items-center">
               <div className="block group-hover:hidden">
                  {formatDateToMonthYear(createdAt)}
               </div>
               <div className="hidden group-hover:block">Read More</div>
            </div>
         </Link>
         <CardContent className="mt-6 px-4">
            <div className="flex gap-x-2 items-center text-muted-foreground text-sm mb-4">
               <Calendar size={16} />{" "}
               <span>{formatDateToMonthYear(createdAt)}</span>
               {/* <Eye className="ml-4" size={18} /> <span>{views} views</span> */}
            </div>
            <Link href={`/blog/${id}`}>
               <CardTitle className="text-lg xl:text-xl hover:text-secondary">
                  <h5>{title}</h5>
               </CardTitle>
            </Link>
            <CardDescription className="mt-3 line-clamp-2">
               <div>{parse(content)}</div>
            </CardDescription>
            <div className="mt-4">
               <Link
                  href={`/blog/${id}`}
                  className="relative before:absolute before:w-full before:-bottom-1 before:right-0 before:border-b before:border-b-2 hover:before:w-0 hover:before:ml-2 hover:before:transition-all hover:before:duration-500 after:absolute after:w-0 after:-bottom-1 after:left-0 after:border-b after:border-primary after:border-b-2 hover:after:w-full hover:after:transition-all hover:after:duration-500 transition-all duration-500"
               >
                  Read More
               </Link>
            </div>
         </CardContent>
      </Card>
   );
}
