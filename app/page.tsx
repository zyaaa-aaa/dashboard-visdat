"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { EducationIncomeChart2 } from "@/components/education-income-chart2"
import { DropoutRateTable } from "@/components/dropout-rate-table"
import { ProvincePovertyChart } from "@/components/province-poverty-chart"
import { ExpandableKipkAnalysis } from "@/components/expandable"
import { CorrelationChart } from "@/components/correlation-chart"
import { provinceData } from "@/data/data"
import { GraduationCap, TrendingUp, Users, BarChart3, PieChart } from "lucide-react"
import dynamic from 'next/dynamic';

// Dynamically import DropoutRateMap with SSR disabled
const DropoutRateMap = dynamic(() => import('../components/dropout-rate-map'), {
  ssr: false 
});

export default function EducationDashboard() {
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [dropoutRangeFilter, setDropoutRangeFilter] = useState([0, 10])
  const [povertyRangeFilter, setPovertyRangeFilter] = useState([0, 4188810]) // Range kemiskinan dalam ribuan
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate min and max poverty values for slider
  const minPoverty = Math.min(...provinceData.map(p => p.povertySum))
  const maxPoverty = Math.max(...provinceData.map(p => p.povertySum))

  const filteredData = provinceData.filter((province) => {
    const matchesProvince = selectedProvince === "all" || province.id === selectedProvince
    const matchesDropoutRange =
      province.dropoutRate >= dropoutRangeFilter[0] && province.dropoutRate <= dropoutRangeFilter[1]
    const matchesPovertyRange =
      province.povertySum >= povertyRangeFilter[0] && province.povertySum <= povertyRangeFilter[1]
    return matchesProvince && matchesDropoutRange && matchesPovertyRange
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                Dashboard Analisis Pendidikan Indonesia
              </h1>
              <p className="text-gray-600 mt-2">
                Evaluasi Efektivitas Distribusi Bantuan Pendidikan (KIP-K) Berdasarkan Angka Putus Kuliah dan Tingkat Kemiskinan di Indonesia.
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Data Tahun 2022
            </Badge>
          </div>
        </div>
      </div>


      <div className="flex flex-col max-w-360 mx-24 lg:px-8 py-4 gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Filters and Key Metrics */}
          <div className="lg:col-span-3 space-y-2">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <BarChart3 className="h-5 w-5" />
                  Filter Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filter Provinsi */}
                <div className="flex items-center gap-4">
                  <label htmlFor="province" className="text-sm font-medium min-w-[120px]">
                    Pilih Provinsi
                  </label>
                  <div className="flex-1">
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                      <SelectTrigger id="province" className="w-full">
                        <SelectValue placeholder="Pilih Provinsi" />
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
                </div>

                {/* Filter Tingkat Putus Kuliah */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Filter Tingkat Putus Kuliah: {dropoutRangeFilter[0]}% - {dropoutRangeFilter[1]}%
                  </label>
                  <Slider
                    value={dropoutRangeFilter}
                    onValueChange={setDropoutRangeFilter}
                    max={10}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Filter Tingkat Kemiskinan */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Filter Jumlah Penduduk Miskin: {(povertyRangeFilter[0] / 1000).toFixed(0)}K - {(povertyRangeFilter[1] / 1000).toFixed(0)}K
                  </label>
                  <Slider
                    value={povertyRangeFilter}
                    onValueChange={setPovertyRangeFilter}
                    max={maxPoverty}
                    min={minPoverty}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{(minPoverty / 1000).toFixed(0)}K</span>
                    <span>{(maxPoverty / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="space-y-2" >
              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Mahasiswa</p>
                      <p className="text-xl font-bold text-blue-600">{totalStudents.toLocaleString("id-ID")}</p>
                    </div>
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Putus Kuliah</p>
                      <p className="text-xl font-bold text-red-600">{Math.round(totalDropouts).toLocaleString("id-ID")}</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Persentase Putus Kuliah</p>
                      <p className="text-xl font-bold text-orange-600">{avgDropoutRate.toFixed(1)}%</p>
                    </div>
                    <PieChart className="h-6 w-6 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Penerima KIP-K</p>
                      <p className="text-xl font-bold text-green-600">{totalKipkRecipients.toLocaleString("id-ID")}</p>
                    </div>
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="dropout-analysis">Analisis Putus Kuliah</TabsTrigger>
                <TabsTrigger value="education-income">Pendidikan & Gaji</TabsTrigger>
                <TabsTrigger value="kipk-distribution">Efektivitas KIP-K</TabsTrigger>
                {/* <TabsTrigger value="correlation">Korelasi Data</TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview" className="space-y-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Peta Persebaran</CardTitle>
                    <CardDescription>Visualisasi data persebaran tingkat putus sekolah</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[440px] w-full relative">
                      {/* Loading fallback */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Memuat peta...</p>
                        </div>
                      </div>
                      
                      {/* Render map hanya jika tab overview aktif */}
                      {activeTab === "overview" && (
                        <DropoutRateMap />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education-income" className="space-y-2">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
                  <Card className="xl:col-span-2">
                    <CardHeader>
                      <CardTitle>Rata-rata Gaji Berdasarkan Tingkat Pendidikan</CardTitle>
                      <CardDescription>Data menunjukkan korelasi positif antara pendidikan dan pendapatan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EducationIncomeChart2 />
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

              <TabsContent value="dropout-analysis" className="space-y-2">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tabel Detail Tingkat Putus Kuliah</CardTitle>
                      <CardDescription>Data lengkap tingkat putus kuliah per provinsi (terurut berdasarkan angka putus kuliah)</CardDescription>
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

              <TabsContent value="kipk-distribution" className="space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribusi KIP-K per Provinsi</CardTitle>
                      <CardDescription>
                        Jumlah penerima bantuan KIP-K di setiap provinsi
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CorrelationChart
                      data={filteredData.map(province => ({
                        name: province.name,
                        povertySum: province.povertySum,
                        dropoutRate: province.dropoutRate,
                        kipk:
                          province.kipkRecipients
                      }))}
                    />
                    <div className="px-4 py-2 bg-orange-50 rounded-lg">
                      <p className="text-orange-800 text-sm">
                        Rasio KIP-K per kapita tinggi tidak selalu identik dengan tingginya putus kuliah. Hal ini menunjukkan bahwa faktor <strong>non-finansial</strong> seperti kesiapan akademik dan dukungan sosial juga berperan penting dalam keberhasilan studi mahasiswa.
                      </p>
                    </div>
                    </CardContent>
                  </Card>

                  <Card className="p-2">
                    <CardContent>
                      <ExpandableKipkAnalysis />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* <TabsContent value="correlation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Korelasi Kemiskinan, Putus Kuliah, dan KIP-K</CardTitle>
                    <CardDescription>
                      Analisis hubungan antara tingkat kemiskinan, putus kuliah, dan distribusi KIP-K
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CorrelationChart
                      data={filteredData.map(province => ({
                        name: province.name,
                        povertySum: province.povertySum,
                        dropoutRate: province.dropoutRate,
                        kipk:
                          province.kipkRecipients
                      }))}
                    />
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>

        {/* Conclusions - Full Width */}
        <Card className="">
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
                    Papua Barat memiliki tingkat putus kuliah tertinggi.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Jawa Timur dan Jawa Barat memiliki kemiskinan tertinggi dan penerima KIP-K terbanyak, hal ini menandakan upaya pemerintah di faktor ekonomi. 
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    Tingkat putus kuliah yang tinggi di daerah yang lebih mampu mungkin disebabkan oleh hal lain selain ekonomi.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-green-900">💡 Rekomendasi:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Pemerintah perlu memastikan bahwa KIP-K benar-benar untuk mahasiswa dari keluarga tidak mampu.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Deteksi dini mahasiswa yang beresiko. Berikan bimbingan terutama di provinsi dengan tingkat putus kuliah tertinggi.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Penanganan angka putus kuliah harus melibatkan Pemerintah Pusat, Daerah, Kampus, dan Komunitas.
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