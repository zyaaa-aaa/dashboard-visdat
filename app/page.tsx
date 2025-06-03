"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { EducationIncomeChart2 } from "@/components/education-income-chart2"
import { DropoutRateTable } from "@/components/dropout-rate-table"
import { ExpandableKipkAnalysis } from "@/components/expandable"
import { CorrelationChart } from "@/components/correlation-chart"
import { provinceData } from "@/data/data"
import { GraduationCap, ArrowBigDown, Users, BarChart3, PieChart } from "lucide-react"
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

  // Saat komponen mount, baca dari localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab")
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  // Setiap kali tab berubah, simpan ke localStorage
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    localStorage.setItem("activeTab", tab)
  }

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
      <div className="bg-background shadow-sm border-b">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                Dashboard Analisis Pendidikan Indonesia
              </h1>
              <p className="text-muted-foreground mt-2">
                Evaluasi Efektivitas Distribusi Bantuan Pendidikan (KIP-K) Berdasarkan Angka Putus Kuliah dan Tingkat Kemiskinan di Indonesia.
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Data Tahun 2022
            </Badge>
          </div>
        </div>
      </div>


      <div className="flex flex-col max-w-360 mx-auto lg:px-8 py-4 gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-fit">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-9 h-full">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
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
                      <div className="absolute inset-0 flex items-center justify-center rounded">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                          <p className="text-sm text-muted-foreground">Memuat peta...</p>
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
                        <h4 className="font-semibold text-primary mb-2">📈 Tren Peningkatan Gaji</h4>
                        <p className="text-primary text-sm">
                          Lulusan Doktor memiliki gaji rata-rata 4.4x lebih tinggi dibanding lulusan SD
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-positive mb-2">💡 ROI Pendidikan</h4>
                        <p className="text-positive text-sm">
                          Investasi pendidikan tinggi memberikan return yang signifikan dalam jangka panjang
                        </p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-warning mb-2">⚠️ Gap Pendapatan</h4>
                        <p className="text-warning text-sm">
                          Terdapat gap pendapatan yang besar antara lulusan SMA dan Diploma/Sarjana
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dropout-analysis" className="space-y-2">
                {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-2"> */}
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Tabel Detail Tingkat Putus Kuliah</CardTitle>
                      <CardDescription>Data lengkap tingkat putus kuliah per provinsi (terurut berdasarkan angka putus kuliah)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DropoutRateTable data={filteredData} />
                    </CardContent>
                  </Card>

                  {/* <Card>
                    <CardHeader>
                      <CardTitle>Distribusi Tingkat Putus Kuliah</CardTitle>
                      <CardDescription>Visualisasi sebaran tingkat putus kuliah di Indonesia</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProvincePovertyChart data={filteredData} />
                    </CardContent>
                  </Card> */}
                {/* </div> */}
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
                      <p className="text-warning text-sm">
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

          {/* Right Column - Filters and Key Metrics */}
          <div className="lg:col-span-3 space-y-2 h-full">
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
                      <SelectTrigger id="province" className="w-full cursor-pointer">
                        <SelectValue placeholder="Pilih Provinsi" className="" />
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
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
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
                      <p className="text-sm font-medium text-muted-foreground">Total Mahasiswa</p>
                      <p className="text-xl font-bold text-primary">{totalStudents.toLocaleString("id-ID")}</p>
                    </div>
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Putus Kuliah</p>
                      <p className="text-xl font-bold text-negative">{Math.round(totalDropouts).toLocaleString("id-ID")}</p>
                    </div>
                    <ArrowBigDown className="h-6 w-6 text-negative" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Persentase Putus Kuliah</p>
                      <p className="text-xl font-bold text-negative">{avgDropoutRate.toFixed(1)}%</p>
                    </div>
                    <PieChart className="h-6 w-6 text-negative" />
                  </div>
                </CardContent>
              </Card>

              <Card className="py-3">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Penerima KIP-K</p>
                      <p className="text-xl font-bold text-positive">{totalKipkRecipients.toLocaleString("id-ID")}</p>
                    </div>
                    <GraduationCap className="h-6 w-6 text-positive" />
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>

        {/* Conclusions - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Kesimpulan dan Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg ">📊 Temuan Utama:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Pendidikan tinggi terbukti meningkatkan pendapatan secara signifikan
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Papua Barat memiliki tingkat putus kuliah tertinggi.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Jawa Timur dan Jawa Barat memiliki kemiskinan tertinggi dan penerima KIP-K terbanyak, hal ini menandakan upaya pemerintah di faktor ekonomi. 
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Tingkat putus kuliah yang tinggi di daerah yang lebih mampu mungkin disebabkan oleh hal lain selain ekonomi.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg ">💡 Rekomendasi:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Pemerintah perlu memastikan bahwa KIP-K benar-benar untuk mahasiswa dari keluarga tidak mampu.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
                    Deteksi dini mahasiswa yang beresiko. Berikan bimbingan terutama di provinsi dengan tingkat putus kuliah tertinggi.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="">•</span>
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