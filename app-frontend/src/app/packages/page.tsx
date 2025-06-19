// export const dynamic = "force-dynamic";
// import BannerPages from "@/components/banner-pages";
// import NextImage from "@/components/Image";
// import { Button } from "@/components/ui/button";
// import { getPackagesResponse, getPagesBannersResponse } from "@/lib/get-data";
// import { cn, getCurrentPageBanner, isEven } from "@/lib/utils";
// import parse from "html-react-parser";
// import Link from "next/link";

// const ExpertsPage = async () => {
//    const [banners, packagesData] = await Promise.all([
//       getPagesBannersResponse(),
//       getPackagesResponse(),
//    ]);
//    const currentBanner = banners
//       ? getCurrentPageBanner(banners, "packages")
//       : null;

//    return (
//       <>
//          <BannerPages
//             image={currentBanner?.image || "/images/placeholder.jpg"}
//             title={currentBanner?.title}
//             alt={currentBanner?.alt || ""}
//          />
//          <div className="container my-10">
//             {packagesData?.map((item, index) => {
//                const even = isEven(index);
//                return (
//                   <div
//                      key={item.id}
//                      className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-8 items-center mb-8"
//                   >
//                      <NextImage
//                         src={item.image}
//                         alt={item.title}
//                         className={cn(
//                            "aspect-square md:col-span-2" +
//                               (!even ? " md:order-2" : "")
//                         )}
//                         imageClassName="object-cover"
//                      />
//                      <div className="md:col-span-3">
//                         <h2>{item.title}</h2>
//                         <div className="mt-2 mb-3">
//                            {parse(item.description)}
//                         </div>
//                         <Link href={`/packages/${item.id}`}>
//                            <Button>View More</Button>
//                         </Link>
//                      </div>
//                   </div>
//                );
//             })}
//          </div>
//       </>
//    );
// };

// export default ExpertsPage;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, ChefHat, Utensils, Sofa, Baby, Users } from "lucide-react";
import { getPagesBannersResponse } from "@/lib/get-data";
import { generatePageMetadata, getCurrentPageBanner } from "@/lib/utils";
import BannerPages from "@/components/banner-pages";
import Link from "next/link";

const packageData = {
   opulent: {
      name: "Opulent",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      rooms: [
         {
            id: 1,
            name: "Master Bed Room",
            icon: <Bed className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate finish doors, 2 drawers, 6'' handles, Hinged door",
               },
            ],
         },
         {
            id: 2,
            name: "Kids Bedroom",
            icon: <Baby className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate finish doors, 2 drawers, 6'' handles, Hinged door",
               },
            ],
         },
         {
            id: 3,
            name: "Kitchen - 5mtr",
            icon: <ChefHat className="w-5 h-5" />,
            items: [
               {
                  name: "Kitchen Setup",
                  details: "WPC 3layer, Acrylic doors, Hood and Hob (3 burner)",
               },
               {
                  name: "Accessories",
                  details:
                     "Tandem box -5 nos, Oil pullout -1, Plate tray -1, GTPT - 1, Waste bin - 1, Cutlery -1",
               },
               {
                  name: "Hood and Hob",
                  details: "Faber/Kutchina",
               },
            ],
         },
         {
            id: 4,
            name: "Dining Room",
            icon: <Utensils className="w-5 h-5" />,
            items: [
               {
                  name: "Wash basin counter",
                  details: "WPC 3 layer, Laminate Finish door, Mirror",
               },
               {
                  name: "Dining Table",
                  details:
                     "MS/Wooden Leg + Glass or Plywood top finished with laminate",
               },
               {
                  name: "Seating",
                  details: "3 chairs + 1 bench with cushion top",
               },
            ],
         },
         {
            id: 5,
            name: "Living Room",
            icon: <Sofa className="w-5 h-5" />,
            items: [
               {
                  name: "Partition",
                  details: "MS work/PVC/Plywood with Mica lamination",
               },
               {
                  name: "TV Unit",
                  details: "PVC/Plywood with Mica lamination and louver",
               },
               {
                  name: "Sofa",
                  details: "Rexin/Fabric industrial work and wood",
               },
            ],
         },
      ],
   },
   majesty: {
      name: "Majesty",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      rooms: [
         {
            id: 1,
            name: "Master Bed Room",
            icon: <Bed className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate/uv/acrylic finish doors, 2 drawers, 6'' handles, Hinged door",
               },
               {
                  name: "Mirror Unit",
                  details: "Drawer box, cushion stool, louver, mirror",
               },
               {
                  name: "Roman blinds 2 nos",
                  details: "Premium window treatment",
               },
            ],
         },
         {
            id: 2,
            name: "Children's Room",
            icon: <Baby className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate/uv/acrylic finish doors, 2 drawers, 6'' handles, Hinged door",
               },
               {
                  name: "Mirror Unit",
                  details: "Drawer box, cushion stool, louver, mirror",
               },
               {
                  name: "Roman blinds 2 nos",
                  details: "Premium window treatment",
               },
            ],
         },
         {
            id: 3,
            name: "Kitchen - 5mtr",
            icon: <ChefHat className="w-5 h-5" />,
            items: [
               {
                  name: "Kitchen Setup",
                  details: "WPC 3layer, Acrylic doors, Hood and Hob (3 burner)",
               },
               {
                  name: "Accessories",
                  details:
                     "Tandem box -5 nos, Oil pullout -1, Plate tray -1, GTPT - 1, Waste bin - 1, Cutlery -1",
               },
               {
                  name: "Hood and Hob",
                  details: "Faber/Kutchina",
               },
               {
                  name: "Kitchen counter top",
                  details: "Tile 15mm with edge double moulding",
               },
               {
                  name: "Cladding tile",
                  details: "2*4 tiles design cut",
               },
               {
                  name: "Window blinds - 2 nos",
                  details: "Premium window treatment",
               },
            ],
         },
         {
            id: 4,
            name: "Dining Room",
            icon: <Utensils className="w-5 h-5" />,
            items: [
               {
                  name: "Wash basin counter",
                  details:
                     "WPC 3 layer, Laminate/UV/Acrylic Finish door, Mirror",
               },
               {
                  name: "Dining Table",
                  details:
                     "MS/Wooden Leg + Glass or Plywood top finished with laminate",
               },
               {
                  name: "Seating",
                  details: "3 chairs + 1 bench with cushion top",
               },
            ],
         },
         {
            id: 5,
            name: "Living Room",
            icon: <Sofa className="w-5 h-5" />,
            items: [
               {
                  name: "Partition",
                  details: "MS work/PVC/Plywood with Mica lamination",
               },
               {
                  name: "TV Unit",
                  details: "PVC/Plywood with Mica lamination and louver",
               },
               {
                  name: "Sofa",
                  details: "Rexin/Fabric industrial work and wood",
               },
               {
                  name: "Full curtain",
                  details: "Complete window dressing solution",
               },
            ],
         },
      ],
   },
   sovereignty: {
      name: "Sovereignty",
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      rooms: [
         {
            id: 1,
            name: "Master Bed Room",
            icon: <Bed className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate/uv/acrylic finish doors, 2 drawers, 6'' handles, Hinged door",
               },
               {
                  name: "Mirror Unit",
                  details: "Drawer box, cushion stool, louver, mirror",
               },
               {
                  name: "Roman blinds 2 nos",
                  details: "Premium window treatment",
               },
               {
                  name: "Texture paint/Wall panelling",
                  details: "Designer wall treatment on one wall",
               },
            ],
         },
         {
            id: 2,
            name: "Children's Room",
            icon: <Baby className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate/uv/acrylic finish doors, 2 drawers, 6'' handles, Hinged door",
               },
               {
                  name: "Mirror Unit",
                  details: "Drawer box, cushion stool, louver, mirror",
               },
               {
                  name: "Roman blinds 2 nos",
                  details: "Premium window treatment",
               },
               {
                  name: "Texture paint/Wall panelling",
                  details: "Designer wall treatment on one wall",
               },
            ],
         },
         {
            id: 3,
            name: "Guest Bedroom",
            icon: <Users className="w-5 h-5" />,
            items: [
               {
                  name: "King size cot",
                  details:
                     "Industrial work, 3 side cushion covering with rexin",
               },
               {
                  name: "Headboard",
                  details: "Design cushion covering with rexin",
               },
               {
                  name: "Side table 2 nos",
                  details: "710 plywood, Laminate finish",
               },
               {
                  name: "Wardrobe (150*210)",
                  details:
                     "710 plywood, laminate/uv/acrylic finish doors, 2 drawers, 6'' handles, Hinged door",
               },
               {
                  name: "Mirror Unit",
                  details: "Drawer box, cushion stool, louver, mirror",
               },
               {
                  name: "Roman blinds 2 nos",
                  details: "Premium window treatment",
               },
               {
                  name: "Texture paint/Wall panelling",
                  details: "Designer wall treatment on one wall",
               },
            ],
         },
         {
            id: 4,
            name: "Kitchen - 5mtr",
            icon: <ChefHat className="w-5 h-5" />,
            items: [
               {
                  name: "Kitchen Setup",
                  details: "WPC 3layer, Acrylic doors, Hood and Hob (3 burner)",
               },
               {
                  name: "Premium Accessories",
                  details:
                     "Tandem box -5 nos, Oil pullout -1, Plate tray -1, GTPT - 1, Waste bin - 1, Cutlery -1, Magic corner -1, Ladder unit -1",
               },
               {
                  name: "Hood and Hob",
                  details: "Faber/Kutchina",
               },
               {
                  name: "Premium Sink",
                  details: "Stainless steel (Premium - Rs 12000/-)",
               },
               {
                  name: "Kitchen counter top",
                  details: "Tile 15mm with edge double moulding",
               },
               {
                  name: "Cladding tile",
                  details: "2*4 tiles design cut",
               },
               {
                  name: "Window blinds - 2 nos",
                  details: "Premium window treatment",
               },
            ],
         },
         {
            id: 5,
            name: "Dining Room",
            icon: <Utensils className="w-5 h-5" />,
            items: [
               {
                  name: "Wash basin counter",
                  details:
                     "WPC 3 layer, Laminate/UV/Acrylic Finish door, Mirror",
               },
               {
                  name: "Luxury Dining Table",
                  details:
                     "MS/Wooden Leg + Glass or Plywood top finished with laminate & luxury",
               },
               {
                  name: "Premium Seating",
                  details: "6 chairs /Premium Type dining table",
               },
               {
                  name: "Texture paint/Wall panelling",
                  details: "Designer wall treatment on one wall",
               },
               {
                  name: "Full curtain",
                  details: "Complete window dressing solution",
               },
            ],
         },
         {
            id: 6,
            name: "Living Room",
            icon: <Sofa className="w-5 h-5" />,
            items: [
               {
                  name: "Partition",
                  details: "MS work/PVC/Plywood with Mica/Acrylic lamination",
               },
               {
                  name: "TV Unit",
                  details: "PVC/Plywood with Mica lamination and louver",
               },
               {
                  name: "Sofa",
                  details: "Rexin/Fabric industrial work and wood",
               },
               {
                  name: "Full curtain",
                  details: "Complete window dressing solution",
               },
               {
                  name: "Texture paint/Wall panelling",
                  details: "Designer wall treatment on one wall",
               },
            ],
         },
      ],
   },
};

export const generateMetadata = () => generatePageMetadata("packages");

export default async function PackageDisplay() {
   const banners = await getPagesBannersResponse();
   const currentBanner = banners
      ? getCurrentPageBanner(banners, "packages")
      : null;
   return (
      <div className="min-h-screen bg-background">
         <BannerPages
            image={currentBanner?.image || "/images/placeholder.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt || ""}
         />
         <div className="container my-8">
            {/* Package Tabs */}
            <Tabs defaultValue="opulent" className="w-full">
               <TabsList className="w-full mb-8 h-10">
                  <TabsTrigger
                     value="opulent"
                     className="text-lg font-semibold flex-1 cursor-pointer"
                  >
                     Opulent
                  </TabsTrigger>
                  <TabsTrigger
                     value="majesty"
                     className="text-lg font-semibold flex-1 cursor-pointer"
                  >
                     Majesty
                  </TabsTrigger>
                  <TabsTrigger
                     value="sovereignty"
                     className="text-lg font-semibold flex-1 cursor-pointer"
                  >
                     Sovereignty
                  </TabsTrigger>
               </TabsList>

               {Object.entries(packageData).map(([key, package_]) => (
                  <TabsContent key={key} value={key}>
                     {/* Package Header */}
                     <div
                        className={`${package_.color} text-white p-6 rounded-t-2xl mb-6`}
                     >
                        <h2 className="text-3xl font-bold mb-2">
                           {package_.name} Package
                        </h2>
                        <p className="text-white/90">
                           {key === "opulent" &&
                              "Premium interior solutions with elegant finishes and modern amenities"}
                           {key === "majesty" &&
                              "Enhanced luxury with premium finishes, mirror units, and window treatments"}
                           {key === "sovereignty" &&
                              "Ultimate luxury with guest bedroom, designer walls, and premium accessories"}
                        </p>
                     </div>

                     {/* Rooms Grid */}
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {package_.rooms.map((room) => (
                           <Card
                              key={room.id}
                              className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
                           >
                              <CardHeader className="pb-4">
                                 <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-slate-100 rounded-lg">
                                       {room.icon}
                                    </div>
                                    <div>
                                       <CardTitle className="text-xl text-slate-800">
                                          {room.name}
                                       </CardTitle>
                                       <Badge
                                          variant="secondary"
                                          className="mt-1 text-background"
                                       >
                                          {room.items.length} items included
                                       </Badge>
                                    </div>
                                 </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                 <div className="space-y-4">
                                    {room.items.map((item, index) => (
                                       <div key={index} className="space-y-2">
                                          <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                                             {item.name}
                                          </h4>
                                          <p className="text-sm text-slate-600 leading-relaxed">
                                             {item.details}
                                          </p>
                                          {index < room.items.length - 1 && (
                                             <Separator className="mt-3" />
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              </CardContent>
                           </Card>
                        ))}
                     </div>
                  </TabsContent>
               ))}
            </Tabs>

            {/* Package Comparison */}
            <div className="mt-16">
               <h2 className="text-3xl font-bold text-center mb-8">
                  Package Comparison
               </h2>
               <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                     <thead>
                        <tr>
                           <th className="p-4 text-left bg-slate-100">
                              Feature
                           </th>
                           <th className="p-4 text-center bg-amber-100">
                              Opulent
                           </th>
                           <th className="p-4 text-center bg-purple-100">
                              Majesty
                           </th>
                           <th className="p-4 text-center bg-emerald-100">
                              Sovereignty
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="p-4 border-b">Number of Bedrooms</td>
                           <td className="p-4 border-b text-center">2</td>
                           <td className="p-4 border-b text-center">2</td>
                           <td className="p-4 border-b text-center">3</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Mirror Units</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">✅</td>
                           <td className="p-4 border-b text-center">✅</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Roman Blinds</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">✅</td>
                           <td className="p-4 border-b text-center">✅</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Wall Treatments</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">✅</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Kitchen Accessories</td>
                           <td className="p-4 border-b text-center">Basic</td>
                           <td className="p-4 border-b text-center">
                              Standard
                           </td>
                           <td className="p-4 border-b text-center">Premium</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Dining Seating</td>
                           <td className="p-4 border-b text-center">
                              3 chairs + bench
                           </td>
                           <td className="p-4 border-b text-center">
                              3 chairs + bench
                           </td>
                           <td className="p-4 border-b text-center">
                              6 premium chairs
                           </td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Premium Sink</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">✅</td>
                        </tr>
                        <tr>
                           <td className="p-4 border-b">Full Curtains</td>
                           <td className="p-4 border-b text-center">❌</td>
                           <td className="p-4 border-b text-center">
                              Living Room
                           </td>
                           <td className="p-4 border-b text-center">
                              Living & Dining
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
               <Link href="/contact">
                  <p className="text-slate-600">
                     Need a custom package? Contact our design consultants for
                     personalized solutions.
                  </p>
               </Link>
            </div>
         </div>
      </div>
   );
}
