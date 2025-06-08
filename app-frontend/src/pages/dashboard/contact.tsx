import ContactForm from "@/components/admin/contact/form";
import DashBoardLayout from "@/components/layout/dashboard/dashboard-layout";
import { useAppDispatch } from "@/hooks/use-store";
import { fetchContact } from "@/store/features/contact-slice";
import { useEffect } from "react";

export default function ContactPage() {
   const dispatch = useAppDispatch();

   useEffect(() => {
      const controller = new AbortController();
      dispatch(fetchContact(controller));
      // dispatch partner
      return () => controller.abort();
   }, []); //eslint-disable-line

   return <ContactForm />;
}

ContactPage.getLayout = function getLayout(page: React.ReactElement) {
   return <DashBoardLayout>{page}</DashBoardLayout>;
};
