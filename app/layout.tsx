import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Contextia - Transparent AI That Actually Saves",
	description: "Reduce AI costs by 35-50%. Track environmental impact. Take back control of your data.",
	keywords: ["AI", "cost optimization", "environmental impact", "transparency", "privacy"],
	authors: [{ name: "Contextia" }],
	openGraph: {
		title: "Contextia - Transparent AI That Actually Saves",
		description: "Reduce AI costs by 35-50%. Track environmental impact.",
		url: "https://contextia.dev",
		siteName: "Contextia",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Contextia - Transparent AI That Actually Saves",
		description: "Reduce AI costs by 35-50%. Track environmental impact.",
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
