"use client";
"use stri";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavigationBar } from "@/components/tabs/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API_BASE_URL } from "@/configs/api";

interface AccessLog {
  _id: string;
  user: string;
  action: string;
  accessTime: string;
  algoStatus: string;
}

interface ChartData {
  name: string;
  value: number;
}

export default function AccessLogsPage() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [sortColumn, setSortColumn] = useState("accessTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Form state
  const [accessTime, setAccessTime] = useState("");
  const [accessDate, setAccessDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [algoStatus, setAlgoStatus] = useState("");

  // Chart filter state
  const [chartStartDate, setChartStartDate] = useState("");
  const [chartEndDate, setChartEndDate] = useState("");
  const [chartAlgoStatus, setChartAlgoStatus] = useState("ALL"); // Updated initial state

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get<AccessLog[]>(
        `${API_BASE_URL}/api/logs/get`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setLogs(response.data);
    } catch (err) {
      setError("Failed to fetch logs. Please try again later.");
      console.error("Error fetching logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/chart/access`,
        {
          accessTime,
          accessDate,
          employeeName,
          algoStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      setChartData(response.data as ChartData[]);
      fetchLogs();
      // Reset form fields
      setAccessTime("");
      setAccessDate("");
      setEmployeeName("");
      setAlgoStatus("");
    } catch (err) {
      console.error("Error submitting log:", err);
      setError("Failed to submit log. Please try again.");
    }
  };

  const fetchFilteredChartData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chart/data`, {
        params: {
          startDate: chartStartDate,
          endDate: chartEndDate,
          algoStatus: chartAlgoStatus,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      setChartData(response.data as ChartData[]);
    } catch (err) {
      setError("Failed to fetch chart data. Please try again later.");
      console.error("Error fetching chart data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedLogs = logs
    .filter((log) => {
      if (!startDate && !endDate) return true;
      const logDate = new Date(log.accessTime);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      return logDate >= start && logDate <= end;
    })
    .sort((a, b) => {
      if (a[sortColumn as keyof AccessLog] < b[sortColumn as keyof AccessLog]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortColumn as keyof AccessLog] > b[sortColumn as keyof AccessLog]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar />
      <main className="container mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Access Logs</h1>

        {/* Chart Access Log Form */}
        <Card className="mb-8 bg-gray-900">
          <CardHeader>
            <CardTitle>Log Chart Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accessTime" className="text-gray-400">
                    Access Time
                  </Label>
                  <Input
                    id="accessTime"
                    type="time"
                    value={accessTime}
                    onChange={(e) => setAccessTime(e.target.value)}
                    required
                    className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                  />
                </div>
                <div>
                  <Label htmlFor="accessDate" className="text-gray-400">
                    Access Date
                  </Label>
                  <Input
                    id="accessDate"
                    type="date"
                    value={accessDate}
                    onChange={(e) => setAccessDate(e.target.value)}
                    required
                    className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeName" className="text-gray-400">
                    Employee Name
                  </Label>
                  <Input
                    id="employeeName"
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                    className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                  />
                </div>
                <div>
                  <Label htmlFor="algoStatus" className="text-gray-400">
                    Energy Saving Mode
                  </Label>
                  <Select onValueChange={setAlgoStatus} value={algoStatus}>
                    <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ON">ON</SelectItem>
                      <SelectItem value="OFF">OFF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Chart Filter */}
        <Card className="mb-8 bg-gray-900">
          <CardHeader>
            <CardTitle>Chart Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="chartStartDate" className="text-gray-400">
                  Start Date
                </Label>
                <Input
                  id="chartStartDate"
                  type="date"
                  value={chartStartDate}
                  onChange={(e) => setChartStartDate(e.target.value)}
                  className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="chartEndDate" className="text-gray-400">
                  End Date
                </Label>
                <Input
                  id="chartEndDate"
                  type="date"
                  value={chartEndDate}
                  onChange={(e) => setChartEndDate(e.target.value)}
                  className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
                />
              </div>
              <div>
                <Label htmlFor="chartAlgoStatus" className="text-gray-400">
                  Energy Saving Mode
                </Label>
                <Select
                  onValueChange={setChartAlgoStatus}
                  value={chartAlgoStatus}
                >
                  <SelectTrigger className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="ON">ON</SelectItem>
                    <SelectItem value="OFF">OFF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={fetchFilteredChartData} className="mt-4 w-full">
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-8 bg-gray-900">
          <CardHeader>
            <CardTitle>Energy Consumption vs Date</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    name="Energy Consumption"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Date Range Filter for Logs */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <Label htmlFor="startDate" className="text-gray-400">
              Start Date
            </Label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-gray-400">
              End Date
            </Label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-white focus:border-white"
            />
          </div>
        </div>

        {/* Log Table */}
        <Card className="bg-gray-900">
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500 p-4">{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-800 hover:bg-gray-800">
                    <TableHead className="text-white font-bold">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("accessTime")}
                        className="text-white hover:text-gray-300"
                      >
                        Access Time
                        {sortColumn === "accessTime" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="ml-2 h-4 w-4 inline" />
                          ) : (
                            <ChevronDown className="ml-2 h-4 w-4 inline" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead className="text-white font-bold">User</TableHead>
                    <TableHead className="text-white font-bold">
                      Action
                    </TableHead>
                    <TableHead className="text-white font-bold">
                      Energy Saving Mode
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedLogs.map((log, index) => (
                    <TableRow
                      key={log._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      } hover:bg-gray-700 transition-colors duration-200`}
                    >
                      <TableCell>
                        {new Date(log.accessTime).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.algoStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
