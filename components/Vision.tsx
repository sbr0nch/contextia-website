"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Vision({ content }: { content: any }) {
	return (
		<section id="vision" className="section">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
				<p className="text-xl text-gray-400">{content.subtitle}</p>
			</motion.div>

			<div className="max-w-3xl mx-auto">
				<div className="card">
					<ul className="space-y-4 mb-8">
						{content.features.map((feature: string, i: number) => (
							<motion.li
								key={i}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="flex items-start gap-3">
								<Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<span className="text-lg">{feature}</span>
							</motion.li>
						))}
					</ul>

					<div className="text-center">
						<a href="#contact" className="btn-primary">
							{content.cta}
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
