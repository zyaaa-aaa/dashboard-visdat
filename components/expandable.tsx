"use client"

import { useState } from "react"
import { poorestProvinces, topKipkProvinces } from "@/data/data"
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

export function ExpandableKipkAnalysis() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-4">
      {/* Clickable Header */}
      <div 
        className=" border flex justify-between items-center gap-2 cursor-pointer hover:bg-positive/20 p-3 rounded-lg transition-colors w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-muted-foreground">
          Analisis Efektivitas KIP-K
        </h3>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground/50">
            {isExpanded ? "Klik untuk tutup" : "Klik untuk lihat detail"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="space-y-6 animate-in slide-in-from-top-2 duration-200 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
            {/* Provinsi Termiskin */}
            <div className="bg-background shadow-sm rounded-lg border p-4 h-full flex flex-col justify-between">
              <h4 className="font-semibold text-negative mb-3 ">4 Provinsi Termiskin</h4>
              <ul className="space-y-2">
                {poorestProvinces.map((province) => (
                  <li
                    key={province.name}
                    className="flex justify-between items-center text-sm bg-negative/10 px-3 py-2 rounded-md"
                  >
                    <span>{province.name}</span>
                    <span className="font-bold text-negative">{province.povertySum}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Penerima KIP-K Terbanyak */}
            <div className="bg-background shadow-sm rounded-lg border p-4 h-full flex flex-col justify-between">
              <h4 className="font-semibold text-positive mb-3 ">4 Provinsi Penerima KIP-K Terbanyak</h4>
              <ul className="space-y-2">
                {topKipkProvinces.map((province) => (
                  <li
                    key={province.name}
                    className="flex justify-between items-center text-sm bg-positive/10 px-3 py-2 rounded-md"
                  >
                    <span>{province.name}</span>
                    <span className="font-bold text-positive">
                      {(province.recipients ?? 0).toLocaleString("id-ID")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analisis */}
            <div className="bg-positive/10 border border-positive p-4 rounded-lg h-full flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-positive w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-semibold text-positive mb-1">Analisis Kesesuaian</h4>
                  <p className="text-sm text-positive leading-relaxed">
                    Pemerintah cukup efektif menargetkan provinsi dengan tingkat kemiskinan tinggi sebagai penerima KIP-K. Namun, tingginya angka putus kuliah menunjukkan bahwa bantuan finansial saja belum cukup untuk menekan masalah ini secara menyeluruh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}