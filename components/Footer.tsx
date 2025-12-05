"use client"

import { Sparkles } from "lucide-react"

export default function Footer({ content }: { content: any }) {
	return (
		<footer className="section bg-dark-lighter border-t border-dark-border">
			<div className="text-center">
				<div className="inline-flex items-center gap-2 text-primary text-3xl font-bold mb-4">
					<Sparkles className="w-8 h-8" />
					<span>CONTEXTIA</span>
				</div>
				<p className="text-gray-400 mb-8">{content.tagline}</p>
				<p className="text-gray-600 text-sm">{content.copyright}</p>
			</div>
		</footer>
	)
}
