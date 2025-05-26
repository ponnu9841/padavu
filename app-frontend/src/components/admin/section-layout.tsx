export default function SectionLayout({
   formSection,
   dataSection,
}: {
   formSection: React.ReactNode;
   dataSection: React.ReactNode;
}) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
         <div className="md:col-span-2">{formSection}</div>
         <div className="md:col-span-3">{dataSection}</div>
      </div>
   );
}
