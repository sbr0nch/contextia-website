"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Zap, BarChart3, Terminal, Info, X } from "lucide-react"

export default function Solution({ content }: { content: any }) {
	const [activeFeature, setActiveFeature] = useState(0)
	const [isLightboxOpen, setIsLightboxOpen] = useState(false)

	const features = [
		{
			icon: <Zap className="w-6 h-6" />,
			title: "Green Technology Impact",
			description: "Real-time tracking of tokens, CO2, and energy savings with detailed metrics",
			image: "/contextia.png",
			highlight: "Save 35-50% on every request",
		},
		{
			icon: <Info className="w-6 h-6" />,
			title: "About Contextia",
			description: "Cache-first strategy with 90% cost reduction on cached tokens",
			image: "/contextia-about.png",
			highlight: "Intelligent caching system",
		},
		{
			icon: <Terminal className="w-6 h-6" />,
			title: "Custom Commands",
			description: "Configure automated commands for your development workflow",
			image: "/contextia-custom-commands.png",
			highlight: "Automate your tasks",
		},
		{
			icon: <BarChart3 className="w-6 h-6" />,
			title: "AI Usage Logs",
			description: "Complete audit trail with cost and environmental metrics",
			image: "/contextia-logs.png",
			highlight: "Full transparency",
		},
	]

	return (
		<section id="solution" className="section">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
				<p className="text-xl text-gray-400">{content.subtitle}</p>
			</motion.div>

			<div className="max-w-6xl mx-auto space-y-12">
				{/* Interactive Feature Showcase */}
				<div className="card p-8">
					<div className="grid md:grid-cols-5 gap-8">
						{/* Feature Tabs - Left Side */}
						<div className="md:col-span-2 space-y-3">
							{features.map((feature, index) => (
								<button
									key={index}
									onClick={() => setActiveFeature(index)}
									className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
										activeFeature === index
											? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
											: "bg-dark-lighter border-dark-border hover:border-primary/50"
									}`}>
									<div className="flex items-start gap-3">
										<div
											className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
												activeFeature === index
													? "bg-primary text-dark"
													: "bg-dark border border-dark-border text-primary"
											}`}>
											{feature.icon}
										</div>
										<div className="flex-1 min-w-0">
											<h3
												className={`font-semibold mb-1 ${
													activeFeature === index ? "text-primary" : "text-white"
												}`}>
												{feature.title}
											</h3>
											<p className="text-sm text-gray-400 line-clamp-2">{feature.description}</p>
										</div>
									</div>
								</button>
							))}
						</div>

						{/* Image Display - Right Side */}
						<div className="md:col-span-3">
							<div className="sticky top-8">
								<AnimatePresence mode="wait">
									<motion.div
										key={activeFeature}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}>
										{/* Clickable Image Container */}
										<button
											onClick={() => setIsLightboxOpen(true)}
											className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-dark-border shadow-2xl bg-dark hover:border-primary transition-all duration-300 cursor-zoom-in group">
											<Image
												src={features[activeFeature].image}
												alt={features[activeFeature].title}
												fill
												className="object-contain group-hover:scale-105 transition-transform duration-300"
												priority
											/>
											{/* Hover Overlay */}
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
												<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 text-dark px-4 py-2 rounded-lg font-semibold">
													Click to enlarge
												</div>
											</div>
										</button>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>

				{/* Lightbox Modal */}
				<AnimatePresence>
					{isLightboxOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsLightboxOpen(false)}
							className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out">
							{/* Close Button */}
							<button
								onClick={() => setIsLightboxOpen(false)}
								className="absolute top-4 right-4 w-12 h-12 rounded-full bg-dark border border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-300 flex items-center justify-center z-10">
								<X className="w-6 h-6" />
							</button>

							{/* Enlarged Image */}
							<motion.div
								initial={{ scale: 0.9 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.9 }}
								onClick={(e) => e.stopPropagation()}
								className="relative max-w-7xl max-h-[90vh] w-full cursor-default">
								<div className="relative w-full h-full">
									<Image
										src={features[activeFeature].image}
										alt={features[activeFeature].title}
										width={1920}
										height={1080}
										className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
										priority
									/>
								</div>
								{/* Image Title */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
									<h3 className="text-2xl font-bold text-white">{features[activeFeature].title}</h3>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Before/After Comparison */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="card">
					<h3 className="text-2xl font-bold mb-8 text-center">Real Savings Example</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
						<div>
							<h4 className="text-xl font-bold mb-4 text-gray-400">{content.before}</h4>
							<p className="text-lg mb-2">{content.demo.before}</p>
						</div>
						<div>
							<h4 className="text-xl font-bold mb-4 text-primary">{content.after}</h4>
							<p className="text-lg mb-2">{content.demo.after}</p>
						</div>
					</div>

					<div className="border-t border-dark-border pt-8">
						<h4 className="text-xl font-bold mb-6 text-primary text-center">{content.saved}</h4>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center p-4 bg-dark-lighter rounded-lg">
								<p className="text-3xl font-bold text-primary mb-2">{content.demo.savings}</p>
								<p className="text-gray-400">Tokens Saved</p>
							</div>
							<div className="text-center p-4 bg-dark-lighter rounded-lg">
								<p className="text-3xl font-bold text-primary mb-2">{content.demo.cost}</p>
								<p className="text-gray-400">Cost Saved</p>
							</div>
							<div className="text-center p-4 bg-dark-lighter rounded-lg">
								<p className="text-3xl font-bold text-primary mb-2">{content.demo.co2}</p>
								<p className="text-gray-400">CO2 Saved</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
