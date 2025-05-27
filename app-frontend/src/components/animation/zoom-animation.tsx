"use client";
import { motion } from "motion/react";

const ZoomAnimation = (props: {
   children: React.ReactNode;
   className?: string;
}) => (
   <>
      <motion.div
         initial={{ scale: 0.5 }}
         whileInView={{ scale: 1 }}
         transition={{ duration: 1, ease: "easeOut" }}
         className={props.className || ""}
      >
         {props.children}
      </motion.div>
   </>
);

export default ZoomAnimation;
