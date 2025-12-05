"use client"

import { Globe } from "lucide-react"

export default function LanguageSwitcher({
	lang,
	setLang,
}: {
	lang: "en" | "it"
	setLang: (lang: "en" | "it") => void
}) {
	return (
		<div className="fixed top-4 right-4 z-50">
			<div className="flex items-center gap-2 bg-dark-lighter border border-dark-border rounded-lg p-2">
				<Globe className="w-4 h-4 text-primary" />
				<button
					onClick={() => setLang("en")}
					className={`px-3 py-1 rounded ${
						lang === "en" ? "bg-primary text-dark font-semibold" : "text-gray-400 hover:text-white"
					} transition-all`}>
					EN
				</button>
				<button
					onClick={() => setLang("it")}
					className={`px-3 py-1 rounded ${
						lang === "it" ? "bg-primary text-dark font-semibold" : "text-gray-400 hover:text-white"
					} transition-all`}>
					IT
				</button>
			</div>
		</div>
	)
}
