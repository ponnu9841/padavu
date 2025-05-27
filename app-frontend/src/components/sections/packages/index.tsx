import AnimatedTypography from "@/components/animation/animated-typography";
import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

// const packages = [
//    {
//       id: "1",
//       title: "OPULENCE",
//       description: "BASIC REQUIREMENT FOR 2 BHK 6.5 LAKH",
//       price: "6.5 LAKH",
//    },
//    {
//       id: "2",
//       title: "MAJESTY",
//       description: "BEYOND IMAGINATION 3 BHK 8 LAKH",
//       price: "8 LAKH",
//    },
//    {
//       id: "3",
//       title: "SOVEREIGNTY",
//       description: "ALL WORK CUSTOM DESIGN 10 LAKH",
//       price: "11 LAKH",
//    },
// ];

export default function Packages({
   packages,
}: {
   packages?: PackagesData[] | null;
}) {
   return (
      <section className="relative bg-secondary text-background">
         <div className="p-5 md:p-10">
            <AnimatedTypography
               variant="h2"
               text="OUR POPULAR PACKAGES"
               className="text-center my-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
               {packages?.map((item) => (
                  <div className="text-center" key={item.id}>
                     <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                     <div className="relative mb-2">
                        <NextImage
                           className="aspect-square lg:aspect-[3/2] h-full"
                           imageClassName="object-cover"
                           src={item.image}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                           <h4 className="text-xl font-bold">{item.title}</h4>
                           <div className="text-xs mt-2">{parse(item.description || "")}</div>
                        </div>
                     </div>
                     <div className="mb-2">
                        <p className="text-green-600 font-bold text-xl">
                           ₹{item.price}
                        </p>
                     </div>
                     <Button
                        className="rounded-full text-lg font-semibold tracking-wider px-10 py-6"
                        size="lg"
                     >
                        Details
                     </Button>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
