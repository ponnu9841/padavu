import { motion } from "motion/react";

export default function BlurAnimation(props: ReactChildren) {
	return (
		<motion.div
			initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
			whileInView={{ opacity: 1, filter: "blur(0)", y: 0 }}
			transition={{ duration: 1, ease: "easeOut" }}
		>
			{props.children}
		</motion.div>
	);
}
