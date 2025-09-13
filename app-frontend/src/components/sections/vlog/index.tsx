import AnimatedTypography from "@/components/animation/animated-typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Vlogs({ vlogData }: { vlogData: VlogResponse | null }) {
  if (vlogData?.data?.length) {
    return (
      <div className="py-10 px-4 max-w-6xl mx-auto">
        {/* <h2 className="mb-3 text-primary">Blog</h2> */}
        <AnimatedTypography variant="h2" text="Vlog" className="mb-4 lg:mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden">
          {vlogData.data.map((item, index) => {
            if (index < 4)
              return (
                <div className="flex flex-col" key={item.id}>
                  <iframe src={item.url} className="aspect-[9/16]" />
                </div>
              );
          })}

          {/* <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div>
            <div className="flex flex-col">
               <NextImage
                  src=""
                  className="w-full aspect-2/3 mb-2"
                  imageClassName="object-cover rounded-lg"
               />
               <h4>Heading</h4>
            </div> */}
        </div>
        {vlogData.data.length > 4 && (
          <div className="mt-4">
            <Link href="/vlog">
              <Button>View More</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
