"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Sparkles, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Hero({ content }: { content: any }) {
	const [showArrow, setShowArrow] = useState(true)

	useEffect(() => {
		const handleScroll = () => {
			// Hide arrow when scrolled past hero section (roughly viewport height)
			setShowArrow(window.scrollY < window.innerHeight * 0.8)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<section className="section min-h-screen flex flex-col justify-center relative overflow-hidden">
			{/* Dashboard Button */}
			<Link
				href="/dashboard"
				className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all backdrop-blur-sm">
				<BarChart3 className="w-4 h-4" />
				<span className="hidden sm:inline">Dashboard</span>
			</Link>

			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow" />
				<div
					className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow"
					style={{ animationDelay: "1s" }}
				/>
			</div>

			<div className="relative z-10 text-center max-w-4xl mx-auto">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-8">
					<div className="inline-flex items-center gap-2 text-primary text-5xl font-bold">
						<Sparkles className="w-12 h-12" />
						<span>CONTEXTIA</span>
					</div>
				</motion.div>

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent leading-tight">
					{content.title}
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
					{content.subtitle}
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
					<a href="#contact" className="btn-primary">
						{content.cta}
					</a>
					<a href="#problem" className="btn-secondary">
						{content.ctaSecondary}
					</a>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{Object.values(content.stats).map((stat: any, i: number) => (
						<div key={i} className="card text-center">
							<p className="text-primary font-semibold">{stat}</p>
						</div>
					))}
				</motion.div>

				{/* Scroll indicator */}
				{showArrow && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 1 }}
						className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
						<ArrowDown className="w-6 h-6 text-primary animate-bounce" />
					</motion.div>
				)}
			</div>
		</section>
	)
}
