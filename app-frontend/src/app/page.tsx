import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
   return (
      <main className="min-h-screen">
         <header className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
               <h1 className="text-3xl">PADAVU</h1>
               <p className="text-sm">INTERIOR SOLUTIONS</p>
            </div>
            <button className="text-white">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
               </svg>
            </button>
         </header>

         {/* Hero Section */}
         <section className="relative h-[500px]">
            <Image
               src="/placeholder.svg?height=500&width=900"
               alt="Modern kitchen interior"
               fill
               className="object-cover"
               priority
            />
            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/70 to-transparent w-full">
               <h2 className="text-white text-4xl md:text-5xl font-bold">
                  #Creating positive spaces
               </h2>
            </div>

            {/* WhatsApp Button */}
            <div className="absolute top-4 right-4">
               <Button className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="white"
                  >
                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
               </Button>
            </div>
         </section>

         {/* Stats Section */}
         <section className="bg-[#8B4513] text-white py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
               <div className="flex flex-col items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="48"
                     height="48"
                     viewBox="0 0 24 24"
                     fill="white"
                  >
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                  <h3 className="text-2xl font-bold mt-2">500+</h3>
                  <p className="text-sm">Satisfied Customer</p>
               </div>
               <div className="flex flex-col items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="48"
                     height="48"
                     viewBox="0 0 24 24"
                     fill="white"
                  >
                     <path d="M15 17h-2v-2h2v2zm0-4h-2v-2h2v2zm0-10H9v2h6V3zM19 3h-2v2h2V3zm0 6h-2v2h2V9zm0 6h-2v2h2v-2zm0 6H5V3h2v18h12v-2zm-6 0h-2v-2h2v2zm-8-6H3v2h2v-2zm0-4H3v2h2V9zm0-4H3v2h2V5zm0-4H3v2h2V1z" />
                  </svg>
                  <h3 className="text-2xl font-bold mt-2">5000+</h3>
                  <p className="text-sm">Sqft Factory</p>
               </div>
               <div className="flex flex-col items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="48"
                     height="48"
                     viewBox="0 0 24 24"
                     fill="white"
                  >
                     <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  <h3 className="text-2xl font-bold mt-2">15+</h3>
                  <p className="text-sm">Years experience</p>
               </div>
               <div className="flex flex-col items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="48"
                     height="48"
                     viewBox="0 0 24 24"
                     fill="white"
                  >
                     <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <h3 className="text-2xl font-bold mt-2">2000+</h3>
                  <p className="text-sm">Completed Works</p>
               </div>
            </div>
         </section>

         {/* Packages Section */}
         <section className="py-10 px-4 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
                     OPULENCE
                  </h3>
                  <div className="relative h-48 mb-4">
                     <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Opulence interior design"
                        fill
                        className="object-cover rounded-md"
                     />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                        <h4 className="text-xl font-bold">OPULENCE</h4>
                        <p className="text-xs mt-2">
                           BASIC REQUIREMENT FOR 2 BHK
                        </p>
                        <p className="text-xs">6.5 LAKH</p>
                     </div>
                  </div>
                  <div className="mb-4">
                     <p className="text-green-600 font-bold">₹6.5 LAKH</p>
                     <p className="text-red-500 line-through">₹8.5 LAKH</p>
                  </div>
                  <Button className="bg-[#8B4513] hover:bg-[#6B3100] text-white rounded-full px-8">
                     Details
                  </Button>
               </div>

               <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
                     MAJESTY
                  </h3>
                  <div className="relative h-48 mb-4">
                     <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Majesty interior design"
                        fill
                        className="object-cover rounded-md"
                     />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                        <h4 className="text-xl font-bold">MAJESTY</h4>
                        <p className="text-xs mt-2">BEYOND IMAGINATION 3 BHK</p>
                        <p className="text-xs">8 LAKH</p>
                     </div>
                  </div>
                  <div className="mb-4">
                     <p className="text-green-600 font-bold">₹8 LAKH</p>
                     <p className="text-red-500 line-through">₹12 LAKH</p>
                  </div>
                  <Button className="bg-[#8B4513] hover:bg-[#6B3100] text-white rounded-full px-8">
                     Details
                  </Button>
               </div>

               <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
                     SOVEREIGNTY
                  </h3>
                  <div className="relative h-48 mb-4">
                     <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Sovereignty interior design"
                        fill
                        className="object-cover rounded-md"
                     />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                        <h4 className="text-xl font-bold">SOVEREIGNTY</h4>
                        <p className="text-xs mt-2">ALL WORK CUSTOM DESIGN</p>
                        <p className="text-xs">10 LAKH</p>
                     </div>
                  </div>
                  <div className="mb-4">
                     <p className="text-green-600 font-bold">₹10 LAKH</p>
                     <p className="text-red-500 line-through">₹16 LAKH</p>
                  </div>
                  <Button className="bg-[#8B4513] hover:bg-[#6B3100] text-white rounded-full px-8">
                     Details
                  </Button>
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className="py-10 px-4 bg-gray-100">
            <div className="max-w-6xl mx-auto">
               <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  Testimonials
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                           <Image
                              src="/placeholder.svg?height=100&width=100"
                              alt="Testimonial"
                              width={100}
                              height={100}
                              className="object-cover"
                           />
                        </div>
                        <h3 className="font-bold">Name</h3>
                        <p className="text-sm text-gray-600">
                           Lorem Ipsum Lorem Ipsum
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </main>
   );
}
