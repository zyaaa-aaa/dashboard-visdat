"use client"
import { poorestProvinces, topKipkProvinces } from "@/data/data"
import { CheckCircle } from "lucide-react"

export function KipkComparisonChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Provinsi Termiskin */}
        <div className="bg-white shadow-sm rounded-lg border p-4">
          <h4 className="font-semibold text-red-700 mb-3">4 Provinsi Termiskin</h4>
          <ul className="space-y-2">
            {poorestProvinces.map((province) => (
              <li
                key={province.name}
                className="flex justify-between items-center text-sm bg-red-50 px-3 py-2 rounded-md"
              >
                <span>{province.name}</span>
                <span className="font-bold text-red-700">{province.povertySum}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Penerima KIP-K Terbanyak */}
        <div className="bg-white shadow-sm rounded-lg border p-4">
          <h4 className="font-semibold text-blue-700 mb-3">4 Provinsi Penerima KIP-K Terbanyak</h4>
          <ul className="space-y-2">
            {topKipkProvinces.map((province) => (
              <li
                key={province.name}
                className="flex justify-between items-center text-sm bg-blue-50 px-3 py-2 rounded-md"
              >
                <span>{province.name}</span>
                <span className="font-bold text-blue-700">
                  {(province.recipients ?? 0).toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Analisis */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
            <div>
              <h4 className="font-semibold text-green-700 mb-1">Analisis Kesesuaian</h4>
              <p className="text-sm text-green-800 leading-relaxed">
                Pemerintah cukup efektif menargetkan provinsi dengan tingkat kemiskinan tinggi sebagai penerima KIP-K. Namun, tingginya angka putus kuliah menunjukkan bahwa bantuan finansial saja belum cukup untuk menekan masalah ini secara menyeluruh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
