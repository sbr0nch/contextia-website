"use client"

import { motion } from "framer-motion"

export default function Differentiators({ content }: { content: any }) {
	return (
		<section className="section bg-dark-lighter">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold">{content.title}</h2>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
				{content.items.map((item: any, i: number) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.1 }}
						className="card">
						<div className="text-4xl mb-4">{item.icon}</div>
						<h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
						<p className="text-gray-400">{item.description}</p>
					</motion.div>
				))}
			</div>
		</section>
	)
}
