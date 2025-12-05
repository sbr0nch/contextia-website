"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function FAQ({ content }: { content: any }) {
	const [openIndex, setOpenIndex] = useState<number | null>(0)

	return (
		<section className="section">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
				<p className="text-xl text-gray-400">{content.subtitle}</p>
			</motion.div>

			<div className="max-w-3xl mx-auto space-y-4">
				{content.items.map((item: any, index: number) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="card cursor-pointer"
						onClick={() => setOpenIndex(openIndex === index ? null : index)}>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold pr-8">{item.question}</h3>
							<motion.div
								animate={{ rotate: openIndex === index ? 180 : 0 }}
								transition={{ duration: 0.3 }}>
								<ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
							</motion.div>
						</div>
						<AnimatePresence>
							{openIndex === index && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="overflow-hidden">
									<p className="text-gray-400 mt-4 leading-relaxed">{item.answer}</p>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				))}
			</div>
		</section>
	)
}
