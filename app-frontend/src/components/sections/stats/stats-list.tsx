"use client";

import { Award, CheckCircle, Factory, Users } from "lucide-react";

const stats = [
   {
      id: "1",
      title: "Satisfied Customer",
      count: "500+",
      icon: Users,
   },
   {
      id: "2",
      title: "Sqft Factory",
      count: "5000+",
      icon: Factory,
   },
   {
      id: "3",
      title: "Years experience",
      count: "15+",
      icon: Award,
   },
   {
      id: "4",
      title: "Completed Projects",
      count: "600+",
      icon: CheckCircle,
   },
];

export default function StatsList() {
   return (
      <>
         {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
               {<stat.icon className="w-6 h-6 md:w-8 md:h-8 lg:w-16 lg:h-16" />}
               <h3 className="text-sm md:text-xl lg:text-2xl font-semibold md:font-bold mt-1 md:mt-2">
                  {stat.count}
               </h3>
               <p className="text-xs lg:text-lg xl:text-lg leading-none md:leading-7 font-semibold md:font-bold tracking-wider max-w-34 text-center">
                  {stat.title}
               </p>
            </div>
         ))}
      </>
   );
}
