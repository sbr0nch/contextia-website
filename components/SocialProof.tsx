"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function SocialProof({ content }: { content: any }) {
	return (
		<section className="section bg-dark-lighter">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
				<p className="text-xl text-gray-400">{content.subtitle}</p>
			</motion.div>

			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{content.stats.map((stat: any, index: number) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.2 }}
						className="text-center">
						<AnimatedCounter end={stat.value} duration={2} suffix={stat.suffix} />
						<p className="text-gray-400 mt-2">{stat.label}</p>
					</motion.div>
				))}
			</div>
		</section>
	)
}

function AnimatedCounter({ end, duration, suffix = "" }: { end: number; duration: number; suffix?: string }) {
	const [count, setCount] = useState(0)
	const [hasAnimated, setHasAnimated] = useState(false)

	useEffect(() => {
		if (hasAnimated) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setHasAnimated(true)
					let startTime: number | null = null
					const animate = (currentTime: number) => {
						if (!startTime) startTime = currentTime
						const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
						setCount(Math.floor(progress * end))
						if (progress < 1) {
							requestAnimationFrame(animate)
						}
					}
					requestAnimationFrame(animate)
					observer.disconnect()
				}
			},
			{ threshold: 0.5 },
		)

		const element = document.getElementById(`counter-${end}`)
		if (element) observer.observe(element)

		return () => observer.disconnect()
	}, [end, duration, hasAnimated])

	return (
		<div id={`counter-${end}`} className="text-5xl font-bold text-primary">
			{count.toLocaleString()}
			{suffix}
		</div>
	)
}
