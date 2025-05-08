import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";

const packages = [
   {
      id: "1",
      title: "OPULENCE",
      description: "BASIC REQUIREMENT FOR 2 BHK 6.5 LAKH",
      price: "6.5 LAKH",
      comparePrice: "8.5 LAKH",
   },
   {
      id: "2",
      title: "MAJESTY",
      description: "BEYOND IMAGINATION 3 BHK 8 LAKH",
      price: "8 LAKH",
      comparePrice: "12 LAKH",
   },
   {
      id: "3",
      title: "SOVEREIGNTY",
      description: "ALL WORK CUSTOM DESIGN 10 LAKH",
      price: "10 LAKH",
      comparePrice: "16 LAKH",
   },
];

export default function Packages() {
   return (
      <section className="relative bg-secondary">
         <div className="bg-card grid grid-cols-1 md:grid-cols-3 gap-8 rounded-xl md:rounded-4xl 2xl:rounded-[80px] p-5 md:p-10">
            {packages.map((item) => (
               <div className="text-center" key={item.id}>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                     {item.title}
                  </h3>
                  <div className="relative mb-2">
                     <NextImage
                        className="aspect-[3/2] h-full"
                     />

                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className="text-xs mt-2">{item.description}</p>
                     </div>
                  </div>
                  <div className="mb-2">
                     <p className="text-green-600 font-bold text-xl">
                        ₹{item.price}
                     </p>
                     <p className="text-red-500 line-through text-xl font-bold">
                        ₹{item.comparePrice}
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
      </section>
   );
}
