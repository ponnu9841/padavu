import BannerPages from "@/components/banner-pages";
import ContactCard from "@/components/sections/contact/contact-card";
import { Card } from "@/components/ui/card";
import { getContactResponse, getPagesBannersResponse } from "@/lib/get-data";
import {
   generatePageMetadata,
   getContact,
   getCurrentPageBanner,
} from "@/lib/utils";

export const generateMetadata = () => generatePageMetadata("contact");

export default async function ContactPage() {
   const [banners, contact] = await Promise.all([
      getPagesBannersResponse(),
      getContactResponse(),
   ]);

   const contactData = contact ? getContact(contact) : null;
   const currentBanner = banners
      ? getCurrentPageBanner(banners, "contact")
      : null;

   return (
      <>
         <BannerPages
            image={currentBanner?.image || "/banner-page.jpg"}
            title={currentBanner?.title}
            alt={currentBanner?.alt}
         />
         <section className="container my-24">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
               <div className="md:col-span-3">
                  <iframe
                     src={
                        contact?.map ||
                        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9076591313856!2d75.7766633!3d11.268198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f17dc076f07%3A0x4a9e60efe16fa084!2sTownin%20Media!5e0!3m2!1sen!2sin!4v1737115703140!5m2!1sen!2sin"
                     }
                     className="w-full h-full min-h-[300px]"
                     loading="lazy"
                  ></iframe>
               </div>
               <div className="flex flex-col gap-6 md:col-span-2">
                  {contactData?.map((item, index) => (
                     <Card
                        className="w-full shadow-2xl p-2 pt-10 pb-6 border-none"
                        key={index}
                     >
                        <ContactCard {...item} />
                     </Card>
                  ))}
               </div>
            </div>
         </section>
      </>
   );
}
