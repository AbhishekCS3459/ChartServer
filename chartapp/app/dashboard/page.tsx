'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, Card, Title } from '@tremor/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Zap, DollarSign, TrendingDown, BarChart2, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { NavigationBar } from '@/components/tabs/NavigationBar'
import CubeLoader from '@/components/tabs/CubeLoader'
import { API_BASE_URL } from '@/configs/api'

interface EnergyData {
  _id: string
  createdAt: string
  serialNo: string
  total_kwh: number
  billing_ammount: number
  cost_reduction: number
  weather: { max_temp: number; min_temp: number }
  energy_savings: {
    savings_percent: number
    ref_kwh: number
    us_meter: number
    us_calc: number
    inv_factor: number
  }
  ac_run_hrs: number
  ac_fan_hrs: number
  algo_status: number
  mitigated_co2: number
}

export default function EnergyDashboard() {
  const [energyData, setEnergyData] = useState<EnergyData[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const itemsPerPage = 10

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await axios.get<EnergyData[]>(`${API_BASE_URL}/api/dashboard/get-data`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        
      })
      setEnergyData(response.data)
    } catch (err) {
      setError('Failed to fetch data. Please try again later.')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredData = energyData.filter((item) => {
    const itemDate = new Date(item.createdAt)
    const start = startDate ? new Date(startDate) : new Date(0)
    const end = endDate ? new Date(endDate) : new Date()
    const dateInRange = itemDate >= start && itemDate <= end
    
    const searchMatch = 
      item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.total_kwh.toString().includes(searchTerm) ||
      item.billing_ammount.toString().includes(searchTerm)

    return dateInRange && searchMatch
  }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const totalEnergy = filteredData.reduce((sum, item) => sum + item.total_kwh, 0)
  const averageEnergy = totalEnergy / filteredData.length || 0
  const totalBilling = filteredData.reduce((sum, item) => sum + item.billing_ammount, 0)
  const totalSavings = filteredData.reduce((sum, item) => sum + item.cost_reduction, 0)

  const chartData = filteredData.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    'Energy Consumption': item.total_kwh,
  }))

  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NavigationBar />
      <main className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Energy Consumption Dashboard
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CubeLoader />
          </div>
        ) : error ? (
          <p className="text-center text-xl text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid gap-6 mb-12 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Energy"
                value={`${totalEnergy.toFixed(2)} kWh`}
                icon={<Zap className="h-8 w-8" />}
                color="from-blue-500 to-blue-600"
              />
              <StatCard
                title="Average Energy"
                value={`${averageEnergy.toFixed(2)} kWh`}
                icon={<BarChart2 className="h-8 w-8" />}
                color="from-green-500 to-green-600"
              />
              <StatCard
                title="Total Billing"
                value={`$${totalBilling.toFixed(2)}`}
                icon={<DollarSign className="h-8 w-8" />}
                color="from-yellow-500 to-yellow-600"
              />
              <StatCard
                title="Total Savings"
                value={`$${totalSavings.toFixed(2)}`}
                icon={<TrendingDown className="h-8 w-8" />}
                color="from-purple-500 to-purple-600"
              />
            </div>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl mb-12 p-6">
              <Title className="text-white text-xl mb-4">Energy Consumption Over Time</Title>
              <AreaChart
                className="h-80 mt-4"
                data={chartData}
                index="date"
                categories={['Energy Consumption']}
                colors={['blue']}
                valueFormatter={(number) => `${number.toFixed(2)} kWh`}
                showLegend={false}
                showYAxis={true}
                showGradient={true}
                startEndOnly={false}
                showAnimation={true}
                curveType="natural"
              />
            </Card>

            <div className="mb-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Label htmlFor="startDate" className="text-white mb-2 block">
                  Start Date
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="endDate" className="text-white mb-2 block">
                  End Date
                </Label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="search" className="text-white mb-2 block">
                  Search
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by serial, energy, or amount"
                    className="bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl p-6">
              <Title className="text-white text-xl mb-4">Energy Consumption Data</Title>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700">
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Serial No</TableHead>
                      <TableHead className="text-white">Energy (kWh)</TableHead>
                      <TableHead className="text-white">Billing Amount</TableHead>
                      <TableHead className="text-white">Savings</TableHead>
                      <TableHead className="text-white">AC Run Hours</TableHead>
                      <TableHead className="text-white">CO2 Mitigated</TableHead>
                      <TableHead className="text-white">Max Temp (°C)</TableHead>
                      <TableHead className="text-white">Min Temp (°C)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                      >
                        <TableCell className="text-white">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-white">{item.serialNo}</TableCell>
                        <TableCell className="text-white">{item.total_kwh.toFixed(2)}</TableCell>
                        <TableCell className="text-white">${item.billing_ammount.toFixed(2)}</TableCell>
                        <TableCell className="text-white">${item.cost_reduction.toFixed(2)}</TableCell>
                        <TableCell className="text-white">{item.ac_run_hrs.toFixed(2)}</TableCell>
                        <TableCell className="text-white">{item.mitigated_co2.toFixed(2)}</TableCell>
                        <TableCell className="text-white">{item.weather.max_temp.toFixed(1)}</TableCell>
                        <TableCell className="text-white">{item.weather.min_temp.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="icon"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-white">
                  Page {currentPage} of {pageCount}
                </span>
                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount}
                  variant="outline"
                  size="icon"
                  className='bg-red-600'
                >
                  <ChevronRight className="h-4 w-4 bg-red-600" />
                </Button>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card className={`bg-gradient-to-br ${color} border border-gray-700 shadow-xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-100 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-full">{icon}</div>
      </div>
    </Card>
  )
}