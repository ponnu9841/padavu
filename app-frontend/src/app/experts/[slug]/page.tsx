export const dynamic = "force-dynamic";
import NextImage from "@/components/Image";
import parse from "html-react-parser";
import { getExpertsById } from "@/lib/get-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ExpertsDetails = async (props: PageProps) => {
   const params = await props.params;

   const data = params ? await getExpertsById(params.slug) : null;

   if (data) {
      return (
         <div className="container ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 items-center gap-8 my-10">
               <NextImage
                  src={data.image}
                  alt={data.title || ""}
                  className="aspect-square lg:col-span-3"
               />
               <div className="lg:col-span-4">
                  <h1>{data.title}</h1>
                  <div>{parse(data.description)}</div>
               </div>
            </div>
         </div>
      );
   }
};

export default ExpertsDetails;
