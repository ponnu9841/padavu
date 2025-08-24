import React from "react";
import StatsList from "./stats-list";

export default function Stats() {
   return (
      <section className="bg-background mx-auto absolute left-1/2 -translate-x-1/2 -translate-y-full w-full z-5">
         <div className="container">
            <div className="bg-card py-6 md:py-8 lg:py-10 px-4 md:mx-3 md:mx-10 rounded-t-xl md:rounded-t-4xl 2xl:rounded-t-[80px] grid grid-cols-4 md:grid-cols-4 gap-3 md:gap-6 text-center">
               <StatsList />
            </div>
         </div>
      </section>
   );
}

