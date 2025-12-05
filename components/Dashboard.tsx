"use client"

import { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Upload, TrendingDown, DollarSign, Zap, Database } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface TestRun {
  run: {
    run_id: string
    timestamp: string
    scenarios_count: number
    total_contextia_cost: number
    total_baseline_cost: number
    total_saved: number
    savings_percentage: number
    avg_cost_savings: number
    avg_token_savings: number
    cache_hit_rate: number
    status: string
  }
  results: Array<{
    scenario_name: string
    scenario_category: string
    cost_savings_percentage: number
    contextia_cost: number
    baseline_cost: number
    contextia_tokens: number
    baseline_tokens: number
  }>
}

export default function Dashboard() {
  const [data, setData] = useState<TestRun[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/upload-data')
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadMessage('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-data', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (result.success) {
        setUploadMessage(`✅ ${result.message} (${result.recordCount} runs)`)
        await fetchData()
      } else {
        setUploadMessage(`❌ ${result.message}`)
      }
    } catch (error) {
      setUploadMessage('❌ Upload failed')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const calculateStats = () => {
    if (data.length === 0) {
      return {
        totalRuns: 0,
        avgSavings: 0,
        totalSaved: 0,
        avgCacheHitRate: 0
      }
    }

    const totalRuns = data.length
    const avgSavings = data.reduce((sum, item) => sum + item.run.savings_percentage, 0) / totalRuns
    const totalSaved = data.reduce((sum, item) => sum + item.run.total_saved, 0)
    const avgCacheHitRate = data.reduce((sum, item) => sum + item.run.cache_hit_rate, 0) / totalRuns

    return { totalRuns, avgSavings, totalSaved, avgCacheHitRate }
  }

  const stats = calculateStats()

  const savingsOverTimeData = {
    labels: data.slice(-10).map(item => new Date(item.run.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Cost Savings %',
        data: data.slice(-10).map(item => item.run.savings_percentage),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const categoryBreakdown = () => {
    const categories = new Map<string, { savings: number[], count: number }>()
    
    data.forEach(item => {
      item.results.forEach(result => {
        if (!categories.has(result.scenario_category)) {
          categories.set(result.scenario_category, { savings: [], count: 0 })
        }
        const cat = categories.get(result.scenario_category)!
        cat.savings.push(result.cost_savings_percentage)
        cat.count++
      })
    })

    const labels = Array.from(categories.keys())
    const avgSavings = labels.map(label => {
      const cat = categories.get(label)!
      return cat.savings.reduce((a, b) => a + b, 0) / cat.savings.length
    })

    return {
      labels,
      datasets: [
        {
          label: 'Average Savings by Category',
          data: avgSavings,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ]
        }
      ]
    }
  }

  const costComparisonData = {
    labels: data.slice(-10).map(item => `Run ${item.run.run_id}`),
    datasets: [
      {
        label: 'Contextia Cost',
        data: data.slice(-10).map(item => item.run.total_contextia_cost),
        backgroundColor: 'rgba(34, 197, 94, 0.8)'
      },
      {
        label: 'Baseline Cost',
        data: data.slice(-10).map(item => item.run.total_baseline_cost),
        backgroundColor: 'rgba(239, 68, 68, 0.8)'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contextia Test Dashboard</h1>
          <p className="text-gray-600">Real-time testing results and performance metrics</p>
        </div>

        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upload Test Data</h2>
              <p className="text-sm text-gray-600">Upload your test-data-export.json file</p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-5 h-5" />
                <span>{uploading ? 'Uploading...' : 'Upload JSON'}</span>
              </div>
            </label>
          </div>
          {uploadMessage && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              {uploadMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Test Runs</h3>
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalRuns}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avg Savings</h3>
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.avgSavings.toFixed(1)}%</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Saved</h3>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-emerald-600">${stats.totalSaved.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Cache Hit Rate</h3>
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{(stats.avgCacheHitRate * 100).toFixed(1)}%</p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Yet</h3>
            <p className="text-gray-600 mb-4">Upload your test results to see visualizations</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Savings Over Time</h3>
                <div className="h-64">
                  <Line data={savingsOverTimeData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
                <div className="h-64">
                  <Bar data={costComparisonData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Savings by Category</h3>
              <div className="h-80">
                <Bar data={categoryBreakdown()} options={chartOptions} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}