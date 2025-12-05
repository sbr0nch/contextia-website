"use client"

import { useState } from "react"
import { en } from "@/content/en"
import { it } from "@/content/it"
import Hero from "@/components/Hero"
import Problem from "@/components/Problem"
import Solution from "@/components/Solution"
import Differentiators from "@/components/Differentiators"
import Vision from "@/components/Vision"
import WhatWeNeed from "@/components/WhatWeNeed"
import FAQ from "@/components/FAQ"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function Home() {
	const [lang, setLang] = useState<"en" | "it">("en")
	const content = lang === "en" ? en : it

	return (
		<main className="min-h-screen">
			<LanguageSwitcher lang={lang} setLang={setLang} />
			<Hero content={content.hero} />
			<Problem content={content.problem} />
			<Solution content={content.solution} />
			<Differentiators content={content.differentiators} />
			<Vision content={content.vision} />
			<WhatWeNeed content={content.whatWeNeed} />
			<FAQ content={content.faq} />
			<ContactForm content={content.contact} lang={lang} />
			<Footer content={content.footer} />
		</main>
	)
}
