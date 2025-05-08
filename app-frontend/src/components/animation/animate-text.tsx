import { motion } from "motion/react";

function AnimateText({ text }: { text?: string }) {
	const textArray = text?.split(" ");

	return (
		<>
			{textArray?.map((el, i) => (
				<motion.span
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{
						duration: 0.25,
						delay: i / 6,
					}}
					key={i}
					className="whitespace-pre-line"
				>
					{`${el} `}
				</motion.span>
			))}
		</>
	);
}

export default AnimateText;
