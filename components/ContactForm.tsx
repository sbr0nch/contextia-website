"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mail, Phone, Linkedin, Calendar, CheckCircle, Loader2 } from "lucide-react"

export default function ContactForm({ content, lang }: { content: any; lang: string }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		interest: "beta",
		message: "",
	})
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus("loading")

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, lang }),
			})

			if (response.ok) {
				setStatus("success")
				setFormData({ name: "", email: "", company: "", interest: "beta", message: "" })
			} else {
				setStatus("error")
			}
		} catch (error) {
			setStatus("error")
		}
	}

	return (
		<section id="contact" className="section bg-dark-lighter py-20">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h2>
				<p className="text-lg text-gray-300">{content.subtitle}</p>
			</motion.div>

			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Form */}
				<div className="card p-8">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<input
								type="text"
								placeholder={content.form.name}
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								required
								className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none text-white"
							/>
						</div>

						<div>
							<input
								type="email"
								placeholder={content.form.email}
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								required
								className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none text-white"
							/>
						</div>

						<div>
							<input
								type="text"
								placeholder={content.form.company}
								value={formData.company}
								onChange={(e) => setFormData({ ...formData, company: e.target.value })}
								className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none text-white"
							/>
						</div>

						<div>
							<select
								value={formData.interest}
								onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
								className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none text-white">
								<option value="beta">{content.form.interests.beta}</option>
								<option value="pilot">{content.form.interests.pilot}</option>
								<option value="partnership">{content.form.interests.partnership}</option>
								<option value="advisory">{content.form.interests.advisory}</option>
								<option value="other">{content.form.interests.other}</option>
							</select>
						</div>

						<div>
							<textarea
								placeholder={content.form.message}
								value={formData.message}
								onChange={(e) => setFormData({ ...formData, message: e.target.value })}
								rows={4}
								className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg focus:border-primary focus:outline-none text-white"
							/>
						</div>

						<button
							type="submit"
							disabled={status === "loading" || status === "success"}
							className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
							{status === "loading" ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									<span>Sending...</span>
								</>
							) : status === "success" ? (
								<>
									<CheckCircle className="w-5 h-5" />
									<span>Sent!</span>
								</>
							) : (
								<>
									<Send className="w-5 h-5" />
									<span>{content.form.submit}</span>
								</>
							)}
						</button>

						<AnimatePresence>
							{status === "success" && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="flex items-center gap-2 text-primary text-center justify-center p-4 bg-primary/10 rounded-lg">
									<CheckCircle className="w-5 h-5" />
									<p>{content.form.success}</p>
								</motion.div>
							)}
							{status === "error" && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="text-red-500 text-center p-4 bg-red-500/10 rounded-lg">
									<p>{content.form.error}</p>
								</motion.div>
							)}
						</AnimatePresence>
					</form>
				</div>

				{/* Direct Contact */}
				<div className="card p-8">
					<h3 className="text-2xl font-bold mb-8 text-primary">{content.direct.title}</h3>
					<div className="space-y-4">
						<a
							href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all">
							<Phone className="w-6 h-6 text-primary" />
							<span>{content.direct.whatsapp}</span>
						</a>

						<a
							href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
							className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all">
							<Mail className="w-6 h-6 text-primary" />
							<span>{content.direct.email}</span>
						</a>

						<a
							href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all">
							<Linkedin className="w-6 h-6 text-primary" />
							<span>{content.direct.linkedin}</span>
						</a>

						<a
							href="#"
							className="flex items-center gap-3 p-4 bg-dark rounded-lg hover:border-primary border border-dark-border transition-all">
							<Calendar className="w-6 h-6 text-primary" />
							<span>{content.direct.calendar}</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
