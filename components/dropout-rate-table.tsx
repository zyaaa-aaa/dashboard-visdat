"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface Province {
  name: string
  dropoutRate: number
  students: number
  povertySum: number
}

interface DropoutRateTableProps {
  data: Province[]
}

type SortKey = keyof Province
type SortOrder = "asc" | "desc"

export function DropoutRateTable({ data }: DropoutRateTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("dropoutRate")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  // Helper to show sort indicator with Lucide icons
  const renderSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null
    return sortOrder === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1" />
    )
  }

  return (
    <div className="h-[420px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="whitespace-normal w-auto cursor-pointer relative group hover:bg-muted-foreground/10"
              onClick={() => handleSort("name")}
            >
              Provinsi {renderSortIndicator("name")}
              <span className="overflow-clip absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
          Tekan salah satu header<br/>kolom untuk urutkan data
              </span>
            </TableHead>
            <TableHead
              className="text-right whitespace-normal w-auto cursor-pointer items-center relative group  hover:bg-muted-foreground/10"
              onClick={() => handleSort("dropoutRate")}
            >
              Putus Kuliah {renderSortIndicator("dropoutRate")}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
          Tekan salah satu header kolom untuk urutkan data
              </span>
            </TableHead>
            <TableHead
              className="text-right whitespace-normal w-auto cursor-pointer relative group  hover:bg-muted-foreground/10"
              onClick={() => handleSort("students")}
            >
              Total Mahasiswa {renderSortIndicator("students")}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
          Tekan salah satu header kolom untuk urutkan data
              </span>
            </TableHead>
            <TableHead
              className="text-right whitespace-normal w-auto cursor-pointer relative group  hover:bg-muted-foreground/10"
            >
              Jumlah Penduduk Miskin {renderSortIndicator("povertySum")}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
          Tekan salah satu header kolom untuk urutkan data
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((province) => (
            <TableRow key={province.name}>
              <TableCell className="font-medium">{province.name}</TableCell>
              <TableCell className="text-right font-mono">
                {province.dropoutRate.toFixed(1)}%
              </TableCell>
              <TableCell className="text-right">
                {province.students.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-right font-mono">
                {province.povertySum.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
