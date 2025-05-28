"use client"
import { poorestProvinces, topKipkProvinces } from "@/data/dummy-data"

export function KipkComparisonChart() {
  const comparisonData = [
    { category: "Provinsi Termiskin", papua: 27.8, papbar: 23.1, ntt: 21.3, maluku: 18.2 },
    { category: "Penerima KIP-K Terbanyak (ribu)", jabar: 28.9, jatim: 25.6, jateng: 22.4, sumut: 18.7 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-4 text-red-700">4 Provinsi Termiskin</h4>
          <div className="space-y-2">
            {poorestProvinces.map((province, index) => (
              <div key={province.name} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">{province.name}</span>
                <span className="text-sm font-bold text-red-700">{province.povertySum}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-blue-700">4 Provinsi Penerima KIP-K Terbanyak</h4>
          <div className="space-y-2">
            {topKipkProvinces.map((province, index) => (
              <div key={province.name} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">{province.name}</span>
                <span className="text-sm font-bold text-blue-700">{province.recipients.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-80 mb-2">✅ Analisis Kesesuaian</h4>
        <p className="text-green-700 text-sm">
          Dari kedua data di atas terlihat bahwa pemerintah sudah cukup efektif dalam menargetkan provinsi dengan jumlah penduduk miskin terbanyak sebagai penerima bantuan KIP-K. Namun, fakta bahwa angka putus kuliah tetap tinggi menunjukkan bahwa bantuan finansial saja belum cukup.
        </p>
      </div>
    </div>
  )
}
