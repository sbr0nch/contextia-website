"use client"

import { motion } from "framer-motion"

export default function Problem({ content }: { content: any }) {
	return (
		<section id="problem" className="section bg-dark-lighter">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
				<p className="text-xl text-gray-400">{content.subtitle}</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{content.items.map((item: any, i: number) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: i * 0.2 }}
						className="card text-center">
						<div className="text-5xl mb-4">{item.icon}</div>
						<h3 className="text-2xl font-bold mb-4 text-primary">{item.title}</h3>
						<p className="text-gray-400">{item.description}</p>
					</motion.div>
				))}
			</div>
		</section>
	)
}
