"use client"

import { motion } from "framer-motion"
import { Shield, Github, Award, Users } from "lucide-react"

export default function TrustBadges() {
	const badges = [
		{
			icon: Shield,
			title: "Privacy First",
			description: "100% Local Processing",
		},
		{
			icon: Github,
			title: "Open Source",
			description: "Transparent & Auditable",
		},
		{
			icon: Award,
			title: "VSCode Marketplace",
			description: "Trusted Extension",
		},
		{
			icon: Users,
			title: "Developer Focused",
			description: "Built by Developers",
		},
	]

	return (
		<section className="section bg-dark-lighter">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{badges.map((badge, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="text-center">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
								<badge.icon className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-bold mb-1">{badge.title}</h3>
							<p className="text-sm text-gray-400">{badge.description}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
