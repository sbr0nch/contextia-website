import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { writeFile, mkdir, readFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
	try {
		const authenticated = await isAuthenticated()
		if (!authenticated) {
			return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
		}

		const formData = await request.formData()
		const file = formData.get("file") as File

		if (!file) {
			return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
		}

		if (!file.name.endsWith(".json")) {
			return NextResponse.json({ success: false, message: "Only JSON files are allowed" }, { status: 400 })
		}

		const fileContent = await file.text()

		let jsonData
		try {
			jsonData = JSON.parse(fileContent)
		} catch (parseError) {
			console.error("JSON parse error:", parseError)
			return NextResponse.json({ success: false, message: "Invalid JSON file" }, { status: 400 })
		}

		if (!Array.isArray(jsonData)) {
			return NextResponse.json({ success: false, message: "JSON must be an array of test runs" }, { status: 400 })
		}

		const dataDir = path.join(process.cwd(), "public", "data")
		console.log("Creating directory:", dataDir)

		try {
			await mkdir(dataDir, { recursive: true })
			console.log("Directory created successfully")
		} catch (mkdirError) {
			console.error("Directory creation error:", mkdirError)
			return NextResponse.json(
				{
					success: false,
					message: `Failed to create directory: ${mkdirError instanceof Error ? mkdirError.message : "Unknown error"}`,
				},
				{ status: 500 },
			)
		}

		const filePath = path.join(dataDir, "test-results.json")
		console.log("Writing file to:", filePath)

		try {
			await writeFile(filePath, JSON.stringify(jsonData, null, 2))
			console.log("File written successfully")
		} catch (writeError) {
			console.error("File write error:", writeError)
			return NextResponse.json(
				{
					success: false,
					message: `Failed to write file: ${writeError instanceof Error ? writeError.message : "Unknown error"}`,
				},
				{ status: 500 },
			)
		}

		return NextResponse.json({
			success: true,
			message: "Data uploaded successfully",
			recordCount: jsonData.length,
		})
	} catch (error) {
		console.error("Upload error (outer catch):", error)
		const errorMessage = error instanceof Error ? error.message : "Unknown error"
		const errorStack = error instanceof Error ? error.stack : undefined
		console.error("Error stack:", errorStack)
		return NextResponse.json({ success: false, message: `Internal server error: ${errorMessage}` }, { status: 500 })
	}
}

export async function GET() {
	try {
		const authenticated = await isAuthenticated()
		if (!authenticated) {
			return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
		}

		const filePath = path.join(process.cwd(), "public", "data", "test-results.json")

		try {
			const fileContent = await readFile(filePath, "utf-8")
			const jsonData = JSON.parse(fileContent)

			return NextResponse.json({
				success: true,
				data: jsonData,
			})
		} catch {
			return NextResponse.json({
				success: true,
				data: [],
			})
		}
	} catch (error) {
		console.error("Get data error:", error)
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
	}
}
