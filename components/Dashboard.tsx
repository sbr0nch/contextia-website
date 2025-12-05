
"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { Line, Bar, Scatter, Doughnut } from 'react-chartjs-2'
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
import { 
  Upload, 
  TrendingDown, 
  DollarSign, 
  Zap, 
  Database, 
  Award,
  Clock,
  Download,
  RefreshCw,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowUpDown
} from 'lucide-react'

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
    contextia_input_tokens?: number
    contextia_output_tokens?: number
    contextia_cached_tokens?: number
    baseline_input_tokens?: number
    baseline_output_tokens?: number
    quality_score?: number
    response_time?: number
  }>
}

interface TooltipConfig {
  title: string
  description: string
  whyItMatters: string
  howToImprove?: string
}

const tooltips: Record<string, TooltipConfig> = {
  totalTests: {
    title: "Total Tests Run",
    description: "The total number of test scenarios executed across all runs",
    whyItMatters: "More tests provide better statistical confidence in your savings data",
    howToImprove: "Run tests regularly to build a comprehensive performance baseline"
  },
  avgSavings: {
    title: "Average Token Savings",
    description: "Average percentage of tokens saved using Contextia vs baseline",
    whyItMatters: "Higher savings mean lower API costs and faster responses",
    howToImprove: "Optimize context selection and use prompt caching effectively"
  },
  totalCostSaved: {
    title: "Total Cost Saved",
    description: "Cumulative dollar amount saved across all test runs",
    whyItMatters: "Direct ROI measurement - this is money back in your budget",
    howToImprove: "Scale usage across more projects to maximize savings"
  },
  qualityScore: {
    title: "Average Quality Score",
    description: "Quality comparison between Contextia and baseline responses",
    whyItMatters: "Ensures cost savings don't compromise output quality",
    howToImprove: "Fine-tune context selection to maintain high quality"
  },
  cacheHitRate: {
    title: "Cache Hit Rate",
    description: "Percentage of requests that benefit from prompt caching",
    whyItMatters: "Higher cache hits = dramatically lower costs (90% savings on cached tokens)",
    howToImprove: "Structure prompts consistently and reuse common contexts"
  },
  responseTime: {
    title: "Average Response Time",
    description: "Average time to receive responses from the API",
    whyItMatters: "Faster responses improve developer productivity and user experience",
    howToImprove: "Optimize context size and leverage caching"
  }
}

export default function Dashboard() {
  const [data, setData] = useState<TestRun[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadError, setUploadError] = useState(false)
  const [queriesPerDay, setQueriesPerDay] = useState(100)
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_data')
    if (stored) {
      try {
        const parsedData = JSON.parse(stored)
        setData(parsedData)
      } catch (error) {
        console.error('Error parsing stored data:', error)
      }
    }
    setLoading(false)
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadMessage('')
    setUploadError(false)

    try {
      const text = await file.text()
      
      let jsonData
      try {
        jsonData = JSON.parse(text)
      } catch (parseError) {
        setUploadMessage('Invalid JSON file')
        setUploadError(true)
        console.error('JSON parse error:', parseError)
        setUploading(false)
        return
      }

      if (!Array.isArray(jsonData)) {
        setUploadMessage('JSON must be an array of test runs')
        setUploadError(true)
        setUploading(false)
        return
      }

      localStorage.setItem('dashboard_data', JSON.stringify(jsonData))
      setData(jsonData)
      setUploadMessage(`Data uploaded successfully (${jsonData.length} runs)`)
      setUploadError(false)
    } catch (error) {
      setUploadMessage('Upload failed')
      setUploadError(true)
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleRefresh = () => {
    const stored = localStorage.getItem('dashboard_data')
    if (stored) {
      try {
        const parsedData = JSON.parse(stored)
        setData(parsedData)
        setUploadMessage('Data refreshed successfully')
        setUploadError(false)
      } catch (error) {
        console.error('Error refreshing data:', error)
      }
    }
  }

  const exportToCSV = () => {
    if (data.length === 0) return

    const headers = ['Scenario', 'Category', 'Savings %', 'Contextia Cost', 'Baseline Cost', 'Cost Saved', 'Quality Score']
    const rows = data.flatMap(run => 
      run.results.map(result => [
        result.scenario_name,
        result.scenario_category,
        result.cost_savings_percentage.toFixed(2),
        result.contextia_cost.toFixed(4),
        result.baseline_cost.toFixed(4),
        (result.baseline_cost - result.contextia_cost).toFixed(4),
        result.quality_score?.toFixed(2) || 'N/A'
      ])
    )

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contextia-results-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const calculateStats = useMemo(() => {
    if (data.length === 0) {
      return {
        totalTests: 0,
        avgSavings: 0,
        totalSaved: 0,
        avgQualityScore: 0,
        avgCacheHitRate: 0,
        avgResponseTime: 0
      }
    }

    const totalTests = data.reduce((sum, item) => sum + item.results.length, 0)
    const avgSavings = data.reduce((sum, item) => sum + item.run.savings_percentage, 0) / data.length
    const totalSaved = data.reduce((sum, item) => sum + item.run.total_saved, 0)
    const avgCacheHitRate = data.reduce((sum, item) => sum + item.run.cache_hit_rate, 0) / data.length

    const allResults = data.flatMap(item => item.results)
    const qualityScores = allResults.filter(r => r.quality_score !== undefined).map(r => r.quality_score!)
    const avgQualityScore = qualityScores.length > 0 
      ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length 
      : 0

    const responseTimes = allResults.filter(r => r.response_time !== undefined).map(r => r.response_time!)
    const avgResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0

    return { totalTests, avgSavings, totalSaved, avgQualityScore, avgCacheHitRate, avgResponseTime }
  }, [data])

  const savingsOverTimeData = useMemo(() => ({
    labels: data.slice(-20).map(item => new Date(item.run.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Cost Savings %',
        data: data.slice(-20).map(item => item.run.savings_percentage),
        borderColor: 'rgb(5, 150, 105)',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }), [data])

  const costComparisonData = useMemo(() => ({
    labels: data.slice(-15).map((item, idx) => `Run ${idx + 1}`),
    datasets: [
      {
        label: 'Contextia Cost',
        data: data.slice(-15).map(item => item.run.total_contextia_cost),
        backgroundColor: 'rgba(5, 150, 105, 0.8)',
        borderRadius: 6
      },
      {
        label: 'Baseline Cost',
        data: data.slice(-15).map(item => item.run.total_baseline_cost),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderRadius: 6
      }
    ]
  }), [data])

  const categoryPerformanceData = useMemo(() => {
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
    const counts = labels.map(label => categories.get(label)!.count)

    return {
      labels,
      datasets: [
        {
          label: 'Average Savings %',
          data: avgSavings,
          backgroundColor: [
            'rgba(30, 58, 138, 0.8)',
            'rgba(5, 150, 105, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(14, 165, 233, 0.8)'
          ],
          borderRadius: 6
        }
      ],
      counts
    }
  }, [data])

  const qualityVsSavingsData = useMemo(() => {
    const allResults = data.flatMap(item => item.results)
    const validResults = allResults.filter(r => r.quality_score !== undefined)

    return {
      datasets: [
        {
          label: 'Scenarios',
          data: validResults.map(r => ({
            x: r.cost_savings_percentage,
            y: r.quality_score!,
            scenario: r.scenario_name
          })),
          backgroundColor: 'rgba(30, 58, 138, 0.6)',
          borderColor: 'rgba(30, 58, 138, 1)',
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    }
  }, [data])

  const tokenDistributionData = useMemo(() => {
    const allResults = data.flatMap(item => item.results)
    const totalInput = allResults.reduce((sum, r) => sum + (r.contextia_input_tokens || 0), 0)
    const totalOutput = allResults.reduce((sum, r) => sum + (r.contextia_output_tokens || 0), 0)
    const totalCached = allResults.reduce((sum, r) => sum + (r.contextia_cached_tokens || 0), 0)

    return {
      labels: ['Input Tokens', 'Output Tokens', 'Cached Tokens'],
      datasets: [
        {
          data: [totalInput, totalOutput, totalCached],
          backgroundColor: [
            'rgba(30, 58, 138, 0.8)',
            'rgba(5, 150, 105, 0.8)',
            'rgba(245, 158, 11, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    }
  }, [data])

  const bestPerformingScenarios = useMemo(() => {
    const allResults = data.flatMap(item => item.results)
    return allResults
      .sort((a, b) => b.cost_savings_percentage - a.cost_savings_percentage)
      .slice(0, 5)
  }, [data])

  const needsImprovementScenarios = useMemo(() => {
    const allResults = data.flatMap(item => item.results)
    return allResults
      .sort((a, b) => a.cost_savings_percentage - b.cost_savings_percentage)
      .slice(0, 5)
  }, [data])

  const calculateROI = (queriesPerDay: number, multiplier: number = 1) => {
    if (data.length === 0) return { daily: 0, monthly: 0, yearly: 0 }
    
    const avgSavingsPerQuery = calculateStats.totalSaved / calculateStats.totalTests
    const adjustedQueries = queriesPerDay * multiplier
    
    const daily = avgSavingsPerQuery * adjustedQueries
    const monthly = daily * 30
    const yearly = daily * 365

    return { daily, monthly, yearly }
  }

  const allResults = useMemo(() => {
    return data.flatMap(run => 
      run.results.map(result => ({
        ...result,
        runId: run.run.run_id,
        timestamp: run.run.timestamp
      }))
    )
  }, [data])

  const filteredResults = useMemo(() => {
    let filtered = allResults
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.scenario_category === selectedCategory)
    }
    return filtered
  }, [allResults, selectedCategory])

  const sortedResults = useMemo(() => {
    if (!sortColumn) return filteredResults

    return [...filteredResults].sort((a, b) => {
      let aVal: any = a[sortColumn as keyof typeof a]
      let bVal: any = b[sortColumn as keyof typeof b]

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }, [filteredResults, sortColumn, sortDirection])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const toggleRowExpansion = (key: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedRows(newExpanded)
  }

  const categories = useMemo(() => {
    const cats = new Set(allResults.map(r => r.scenario_category))
    return ['all', ...Array.from(cats)]
  }, [allResults])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: 'Inter, sans-serif'
        },
        bodyFont: {
          size: 13,
          family: 'Inter, sans-serif'
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  }

  const scatterOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const point = context.raw
            return [
              `Scenario: ${point.scenario}`,
              `Savings: ${point.x.toFixed(1)}%`,
              `Quality: ${point.y.toFixed(1)}`
            ]
          }
        }
      }
    }
  }

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    tooltipKey 
  }: { 
    title: string
    value: string | number
    icon: any
    color: string
    tooltipKey: string
  }) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const tooltip = tooltips[tooltipKey]

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow relative group">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className={`text-3xl font-bold font-mono ${color}`}>{value}</p>
        
        {showTooltip && tooltip && (
          <div className="absolute z-50 w-80 p-4 bg-gray-900 text-white rounded-lg shadow-2xl -top-2 left-full ml-4 text-sm">
            <div className="font-bold mb-2">{tooltip.title}</div>
            <div className="mb-2 text-gray-300">{tooltip.description}</div>
            <div className="mb-2">
              <span className="font-semibold text-emerald-400">Why it matters:</span>
              <span className="text-gray-300"> {tooltip.whyItMatters}</span>
            </div>
            {tooltip.howToImprove && (
              <div>
                <span className="font-semibold text-blue-400">How to improve:</span>
                <span className="text-gray-300"> {tooltip.howToImprove}</span>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contextia Analytics Dashboard</h1>
          <p className="text-gray-600">Professional insights into your cost savings and performance metrics</p>
        </div>

        {/* Upload Section */}
        <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upload Test Data</h2>
              <p className="text-sm text-gray-600">Upload your test-data-export.json file to visualize results</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>
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
          </div>
          {uploadMessage && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              uploadError 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {uploadMessage}
            </div>
          )}
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Tests Run"
            value={calculateStats.totalTests.toLocaleString()}
            icon={Database}
            color="text-blue-600"
            tooltipKey="totalTests"
          />
          <MetricCard
            title="Average Token Savings"
            value={`${calculateStats.avgSavings.toFixed(1)}%`}
            icon={TrendingDown}
            color="text-emerald-600"
            tooltipKey="avgSavings"
          />
          <MetricCard
            title="Total Cost Saved"
            value={`$${calculateStats.totalSaved.toFixed(2)}`}
            icon={DollarSign}
            color="text-green-600"
            tooltipKey="totalCostSaved"
          />
          <MetricCard
            title="Average Quality Score"
            value={calculateStats.avgQualityScore > 0 ? calculateStats.avgQualityScore.toFixed(1) : 'N/A'}
            icon={Award}
            color="text-purple-600"
            tooltipKey="qualityScore"
          />
          <MetricCard
            title="Cache Hit Rate"
            value={`${(calculateStats.avgCacheHitRate * 100).toFixed(1)}%`}
            icon={Zap}
            color="text-amber-600"
            tooltipKey="cacheHitRate"
          />
          <MetricCard
            title="Avg Response Time"
            value={calculateStats.avgResponseTime > 0 ? `${calculateStats.avgResponseTime.toFixed(0)}ms` : 'N/A'}
            icon={Clock}
            color="text-indigo-600"
            tooltipKey="responseTime"
          />
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Yet</h3>
            <p className="text-gray-600 mb-4">Upload your test results to see comprehensive visualizations and insights</p>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Savings Over Time */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Savings Over Time</h3>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg -top-2 right-6">
                      Track savings performance over time
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <Line data={savingsOverTimeData} options={chartOptions} />
                </div>
              </div>

              {/* Cost Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Cost Comparison</h3>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg -top-2 right-6">
                      Compare actual costs with and without Contextia
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <Bar data={costComparisonData} options={chartOptions} />
                </div>
              </div>

              {/* Category Performance */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg -top-2 right-6">
                      Which types of tasks save the most
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <Bar 
                    data={categoryPerformanceData} 
                    options={{
                      ...chartOptions,
                      indexAxis: 'y' as const,
                      plugins: {
                        ...chartOptions.plugins,
                        tooltip: {
                          ...chartOptions.plugins.tooltip,
                          callbacks: {
                            label: (context: any) => {
                              const idx = context.dataIndex
                              const count = categoryPerformanceData.counts[idx]
                              return [
                                `Avg Savings: ${context.parsed.x.toFixed(1)}%`,
                                `Test Count: ${count}`
                              ]
                            }
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              {/* Quality vs Savings */}
              {qualityVsSavingsData.datasets[0].data.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quality vs Savings</h3>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="hidden group-hover:block absolute z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg -top-2 right-6">
                        Verify quality is maintained while saving costs
                      </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <Scatter data={qualityVsSavingsData} options={scatterOptions} />
                  </div>
                </div>
              )}

              {/* Token Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Token Distribution</h3>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg -top-2 right-6">
                      Understand token usage breakdown
                    </div>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-64 h-64">
                    <Doughnut 
                      data={tokenDistributionData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          legend: {
                            position: 'bottom' as const
                          }
                        }
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ROI Calculator</h3>
              <p className="text-gray-600 mb-6">Based on your actual test data, estimate savings at different scales</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Queries per day (per developer):
                </label>
                <input
                  type="number"
                  value={queriesPerDay}
                  onChange={(e) => setQueriesPerDay(Number(e.target.value))}
                  className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Solo Developer', multiplier: 1 },
                  { title: 'Small Team (5 devs)', multiplier: 5 },
                  { title: 'Medium Team (20 devs)', multiplier: 20 },
                  { title: 'Enterprise (100+ devs)', multiplier: 100 }
                ].map(({ title, multiplier }) => {
                  const roi = calculateROI(queriesPerDay, multiplier)
                  return (
                    <div key={title} className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily:</span>
                          <span className="font-mono font-semibold text-green-600">${roi.daily.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly:</span>
                          <span className="font-mono font-semibold text-green-600">${roi.monthly.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Yearly:</span>
                          <span className="font-mono font-semibold text-emerald-600">${roi.yearly.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Best Performing Scenarios */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Performing Scenarios</h3>
                <div className="space-y-3">
                  {bestPerformingScenarios.map((scenario, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{scenario.scenario_name}</div>
                        <div className="text-xs text-gray-600">{scenario.scenario_category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{scenario.cost_savings_percentage.toFixed(1)}%</div>
                        {scenario.quality_score && (
                          <div className="text-xs text-gray-600">Quality: {scenario.quality_score.toFixed(1)}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Needs Improvement */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Needs Improvement</h3>
                <div className="space-y-3">
                  {needsImprovementScenarios.map((scenario, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{scenario.scenario_name}</div>
                        <div className="text-xs text-gray-600">{scenario.scenario_category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-600">{scenario.cost_savings_percentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-600">Optimize context</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Test Results Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Test Results</h3>
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('scenario_name')}
                          className="flex items-center gap-1 hover:text-blue-600"
                        >
                          Scenario
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-left p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('scenario_category')}
                          className="flex items-center gap-1 hover:text-blue-600"
                        >
                          Category
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('cost_savings_percentage')}
                          className="flex items-center gap-1 hover:text-blue-600 ml-auto"
                        >
                          Savings %
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('contextia_cost')}
                          className="flex items-center gap-1 hover:text-blue-600 ml-auto"
                        >
                          Contextia Cost
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('baseline_cost')}
                          className="flex items-center gap-1 hover:text-blue-600 ml-auto"
                        >
                          Baseline Cost
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-gray-700">
                        <button
                          onClick={() => handleSort('quality_score')}
                          className="flex items-center gap-1 hover:text-blue-600 ml-auto"
                        >
                          Quality
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedResults.slice(0, 50).map((result, idx) => {
                      const key = `${result.runId}-${result.scenario_name}`
                      const isExpanded = expandedRows.has(key)
                      return (
                        <React.Fragment key={key}>
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 text-sm text-gray-900">{result.scenario_name}</td>
                            <td className="p-3 text-sm text-gray-600">{result.scenario_category}</td>
                            <td className="p-3 text-sm text-right font-mono font-semibold text-green-600">
                              {result.cost_savings_percentage.toFixed(1)}%
                            </td>
                            <td className="p-3 text-sm text-right font-mono text-gray-900">
                              ${result.contextia_cost.toFixed(4)}
                            </td>
                            <td className="p-3 text-sm text-right font-mono text-gray-900">
                              ${result.baseline_cost.toFixed(4)}
                            </td>
                            <td className="p-3 text-sm text-right font-mono text-gray-900">
                              {result.quality_score?.toFixed(1) || 'N/A'}
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => toggleRowExpansion(key)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className="bg-gray-50">
                              <td colSpan={7} className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <div className="text-gray-600 mb-1">Contextia Tokens</div>
                                    <div className="font-mono font-semibold">{result.contextia_tokens.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <div className="text-gray-600 mb-1">Baseline Tokens</div>
                                    <div className="font-mono font-semibold">{result.baseline_tokens.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <div className="text-gray-600 mb-1">Cost Saved</div>
                                    <div className="font-mono font-semibold text-green-600">
                                      ${(result.baseline_cost - result.contextia_cost).toFixed(4)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-gray-600 mb-1">Response Time</div>
                                    <div className="font-mono font-semibold">
                                      {result.response_time ? `${result.response_time}ms` : 'N/A'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
                {sortedResults.length > 50 && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Showing 50 of {sortedResults.length} results
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}