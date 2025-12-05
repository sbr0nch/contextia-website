"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export default function Comparison({ content }: { content: any }) {
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

			<div className="max-w-5xl mx-auto overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-dark-border">
							<th className="text-left p-4 font-bold text-lg">{content.feature}</th>
							<th className="text-center p-4 font-bold text-lg text-primary">{content.contextia}</th>
							<th className="text-center p-4 font-bold text-lg text-gray-400">{content.others}</th>
						</tr>
					</thead>
					<tbody>
						{content.features.map((feature: any, index: number) => (
							<motion.tr
								key={index}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="border-b border-dark-border hover:bg-dark-lighter transition-colors">
								<td className="p-4">{feature.name}</td>
								<td className="p-4 text-center">
									{feature.contextia ? (
										<Check className="w-6 h-6 text-primary mx-auto" />
									) : (
										<X className="w-6 h-6 text-gray-600 mx-auto" />
									)}
								</td>
								<td className="p-4 text-center">
									{feature.others ? (
										<Check className="w-6 h-6 text-gray-600 mx-auto" />
									) : (
										<X className="w-6 h-6 text-gray-600 mx-auto" />
									)}
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mt-12">
				<a href="#contact" className="btn-primary">
					{content.cta}
				</a>
			</motion.div>
		</section>
	)
}
