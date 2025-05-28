"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { EducationIncomeChart } from "@/components/education-income-chart"
import { KipkComparisonChart } from "@/components/kipk-comparison-chart"
import { DropoutRateTable } from "@/components/dropout-rate-table"
import { ProvincePovertyChart } from "@/components/province-poverty-chart"
import { KipkDistributionChart } from "@/components/kipk-distribution-chart"
import { CorrelationChart } from "@/components/correlation-chart"
import { provinceData } from "@/data/dummy-data"
import { GraduationCap, TrendingUp, Users, BarChart3, PieChart } from "lucide-react"

export default function EducationDashboard() {
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [dropoutRangeFilter, setDropoutRangeFilter] = useState([0, 20])
  const [activeTab, setActiveTab] = useState("overview")

  const filteredData = provinceData.filter((province) => {
    const matchesProvince = selectedProvince === "all" || province.id === selectedProvince
    const matchesDropoutRange =
      province.dropoutRate >= dropoutRangeFilter[0] && province.dropoutRate <= dropoutRangeFilter[1]
    return matchesProvince && matchesDropoutRange
  })

  const totalStudents = filteredData.reduce((sum, province) => sum + province.students, 0)
  const totalDropouts = filteredData.reduce(
    (sum, province) => sum + (province.students * province.dropoutRate) / 100,
    0,
  )
  const avgDropoutRate = filteredData.reduce((sum, province) => sum + province.dropoutRate, 0) / filteredData.length
  const totalKipkRecipients = filteredData.reduce((sum, province) => sum + province.kipkRecipients, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                Dashboard Analisis Pendidikan Indonesia
              </h1>
              <p className="text-gray-600 mt-2">
                Analisis kontribusi pendidikan terhadap pendapatan ekonomi dan evaluasi efektivitas distribusi bantuan
                KIP-K
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Data Tahun 2024
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Filter Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Pilih Provinsi</label>
                <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Provinsi</SelectItem>
                    {provinceData.map((province) => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Filter Tingkat Putus Kuliah: {dropoutRangeFilter[0]}% - {dropoutRangeFilter[1]}%
                </label>
                <Slider
                  value={dropoutRangeFilter}
                  onValueChange={setDropoutRangeFilter}
                  max={20}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Mahasiswa</p>
                  <p className="text-2xl font-bold text-blue-600">{totalStudents.toLocaleString("id-ID")}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Putus Kuliah</p>
                  <p className="text-2xl font-bold text-red-600">{Math.round(totalDropouts).toLocaleString("id-ID")}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rata-rata Putus Kuliah</p>
                  <p className="text-2xl font-bold text-orange-600">{avgDropoutRate.toFixed(1)}%</p>
                </div>
                <PieChart className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Penerima KIP-K</p>
                  <p className="text-2xl font-bold text-green-600">{totalKipkRecipients.toLocaleString("id-ID")}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="education-income">Pendidikan & Gaji</TabsTrigger>
            <TabsTrigger value="dropout-analysis">Analisis Putus Kuliah</TabsTrigger>
            <TabsTrigger value="kipk-distribution">Distribusi KIP-K</TabsTrigger>
            <TabsTrigger value="correlation">Korelasi Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tingkat Putus Kuliah per Provinsi</CardTitle>
                  <CardDescription>Data menunjukkan variasi tingkat putus kuliah di seluruh Indonesia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProvincePovertyChart data={filteredData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hubungan Pendidikan dan Pendapatan</CardTitle>
                  <CardDescription>Semakin tinggi pendidikan, semakin besar potensi pendapatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <EducationIncomeChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Perbandingan Provinsi Termiskin vs Penerima KIP-K Terbanyak</CardTitle>
                <CardDescription>
                  Evaluasi kesesuaian distribusi bantuan pendidikan dengan tingkat kemiskinan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KipkComparisonChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education-income" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rata-rata Gaji Berdasarkan Tingkat Pendidikan</CardTitle>
                  <CardDescription>Data menunjukkan korelasi positif antara pendidikan dan pendapatan</CardDescription>
                </CardHeader>
                <CardContent>
                  <EducationIncomeChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Insight Pendidikan dan Ekonomi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">📈 Tren Peningkatan Gaji</h4>
                    <p className="text-blue-800 text-sm">
                      Lulusan Doktor memiliki gaji rata-rata 4.4x lebih tinggi dibanding lulusan SD
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">💡 ROI Pendidikan</h4>
                    <p className="text-green-800 text-sm">
                      Investasi pendidikan tinggi memberikan return yang signifikan dalam jangka panjang
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">⚠️ Gap Pendapatan</h4>
                    <p className="text-orange-800 text-sm">
                      Terdapat gap pendapatan yang besar antara lulusan SMA dan Diploma/Sarjana
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dropout-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tabel Detail Tingkat Putus Kuliah</CardTitle>
                  <CardDescription>Data lengkap tingkat putus kuliah per provinsi</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropoutRateTable data={filteredData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribusi Tingkat Putus Kuliah</CardTitle>
                  <CardDescription>Visualisasi sebaran tingkat putus kuliah di Indonesia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProvincePovertyChart data={filteredData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kipk-distribution" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribusi KIP-K per Provinsi</CardTitle>
                  <CardDescription>Jumlah penerima bantuan KIP-K di setiap provinsi</CardDescription>
                </CardHeader>
                <CardContent>
                  <KipkDistributionChart data={filteredData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analisis Efektivitas KIP-K</CardTitle>
                  <CardDescription>Perbandingan provinsi termiskin dengan penerima KIP-K terbanyak</CardDescription>
                </CardHeader>
                <CardContent>
                  <KipkComparisonChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="correlation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Korelasi Kemiskinan, Putus Kuliah, dan KIP-K</CardTitle>
                <CardDescription>
                  Analisis hubungan antara tingkat kemiskinan, putus kuliah, dan distribusi KIP-K
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CorrelationChart data={filteredData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Conclusions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Kesimpulan dan Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-blue-900">📊 Temuan Utama:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Pendidikan tinggi terbukti meningkatkan pendapatan secara signifikan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Papua dan Papua Barat memiliki tingkat putus kuliah dan kemiskinan tertinggi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Distribusi KIP-K belum sepenuhnya sesuai dengan tingkat kemiskinan daerah
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-green-900">💡 Rekomendasi:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Realokasi KIP-K lebih fokus ke provinsi dengan tingkat kemiskinan tinggi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Program pendampingan khusus untuk daerah dengan dropout rate tinggi
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Peningkatan infrastruktur pendidikan di wilayah timur Indonesia
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
