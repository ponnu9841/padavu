import NextImage from "@/components/Image";
import { ShadowGradient } from "../about";

export default function Mission() {
   return (
      <section className="px-4 flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
         <div className="md:w-3/5 text-primary/90">
            <h2 className="text-2xl font-bold mb-6">
               Our Mission
            </h2>

            <p className="mb-4 text-sm">
               At Padavu Interio, we deliver interior design solutions with
               integrity and transparency. We commit to:
            </p>
            <ul className="space-y-2 text-sm">
               <li>- Never sacrifice standards for the sake of a project</li>
               <li>- Fair pricing</li>
               <li>- Accountability to our customers</li>
               <li>- Empathetic understanding of their unique needs</li>
               <li>
                  - Building trust and lasting relationship with our customers.
               </li>
            </ul>
         </div>
         <div className="md:w-2/5 relative">
            <NextImage
               src="/images/about.webp"
               alt="Modern interior with plants"
               className="w-full h-auto h-full"
               imageClassName="object-cover rounded-r-large"
            />
            <ShadowGradient />
         </div>
      </section>
   );
}
