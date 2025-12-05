"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/Dashboard"
import { Lock, LogOut } from "lucide-react"

export default function DashboardPage() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)
	const [loggingIn, setLoggingIn] = useState(false)
	const router = useRouter()

	useEffect(() => {
		checkAuth()
	}, [])

	const checkAuth = async () => {
		try {
			const response = await fetch("/api/upload-data")
			if (response.ok) {
				setIsAuthenticated(true)
			}
		} catch (error) {
			console.error("Auth check failed:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setLoggingIn(true)

		try {
			const response = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			})

			const result = await response.json()

			if (result.success) {
				setIsAuthenticated(true)
				setPassword("")
			} else {
				setError(result.message || "Invalid password")
			}
		} catch (error) {
			setError("Login failed. Please try again.")
			console.error("Login error:", error)
		} finally {
			setLoggingIn(false)
		}
	}

	const handleLogout = async () => {
		try {
			await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "logout" }),
			})
			setIsAuthenticated(false)
			router.refresh()
		} catch (error) {
			console.error("Logout error:", error)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		)
	}

	if (!isAuthenticated) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-lg shadow-xl p-8">
						<div className="flex items-center justify-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
								<Lock className="w-8 h-8 text-white" />
							</div>
						</div>

						<h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Contextia Dashboard</h1>
						<p className="text-center text-gray-600 mb-6">Enter password to access test results</p>

						<form onSubmit={handleLogin}>
							<div className="mb-4">
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
									placeholder="Enter dashboard password"
									required
									disabled={loggingIn}
								/>
							</div>

							{error && (
								<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
									{error}
								</div>
							)}

							<button
								type="submit"
								disabled={loggingIn}
								className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{loggingIn ? "Logging in..." : "Access Dashboard"}
							</button>
						</form>

						<div className="mt-6 text-center text-sm text-gray-500">
							<p>Protected by password authentication</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="relative">
			<div className="absolute top-4 right-4 z-10">
				<button
					onClick={handleLogout}
					className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-gray-900">
					<LogOut className="w-4 h-4" />
					<span>Logout</span>
				</button>
			</div>
			<Dashboard />
		</div>
	)
}
