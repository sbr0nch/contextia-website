"use client"

import { motion } from "framer-motion"

export default function WhatWeNeed({ content }: { content: any }) {
	return (
		<section id="what-we-need" className="section">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
					<p className="text-xl text-gray-400">{content.subtitle}</p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8">
					{content.items.map((item: any, index: number) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="card hover:border-primary/50 transition-colors">
							<div className="text-4xl mb-4">{item.icon}</div>
							<h3 className="text-xl font-semibold mb-3 text-primary">{item.title}</h3>
							<p className="text-gray-400">{item.description}</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="text-center mt-12">
					<a href="#contact" className="btn-primary">
						Get In Touch
					</a>
				</motion.div>
			</div>
		</section>
	)
}
