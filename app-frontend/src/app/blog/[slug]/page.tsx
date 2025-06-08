import NextImage from "@/components/Image";
import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import { formatDateToMonthYear } from "@/lib/utils";
import { getBlogResponseById } from "@/lib/get-data";

type PageProps = {
   params: Promise<{ slug: string }>;
};

export default async function BlogDetailsPage(props: PageProps) {
   const params = await props.params;

   const blog = params ? await getBlogResponseById(params.slug) : null;
   if (blog) {
      return (
         <div className="container mt-32">
            <div className="max-w-[700px] mx-auto">
               <NextImage
                  src={blog.image}
                  alt={blog.title}
                  className="aspect-square max-h-[400px]"
               />
               <div className="flex gap-x-2 items-center text-muted-foreground text-sm mb-4">
                  <Calendar size={16} />{" "}
                  <span>{formatDateToMonthYear(blog.createdAt)}</span>
               </div>
               <h1 className="text-2xl lg:text-5xl mb-4">{blog.title}</h1>
               <div className="[&>ul]:list-disc [&>ul]:ml-8">
                  {parse(blog.content)}
               </div>
            </div>
         </div>
      );
   }
}
