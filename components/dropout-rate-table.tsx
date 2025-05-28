"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Province {
  name: string
  dropoutRate: number
  students: number
  povertyRate: number
}

interface DropoutRateTableProps {
  data: Province[]
}

export function DropoutRateTable({ data }: DropoutRateTableProps) {
  const sortedData = [...data].sort((a, b) => b.dropoutRate - a.dropoutRate)

  const getDropoutBadge = (rate: number) => {
    if (rate >= 10) return <Badge variant="destructive">Tinggi</Badge>
    if (rate >= 7) return <Badge variant="secondary">Sedang</Badge>
    return <Badge variant="default">Rendah</Badge>
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provinsi</TableHead>
            <TableHead className="text-right">Putus Kuliah (%)</TableHead>
            <TableHead className="text-right">Total Mahasiswa</TableHead>
            <TableHead className="text-right">Tingkat Kemiskinan (%)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((province) => (
            <TableRow key={province.name}>
              <TableCell className="font-medium">{province.name}</TableCell>
              <TableCell className="text-right font-mono">{province.dropoutRate.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{province.students.toLocaleString("id-ID")}</TableCell>
              <TableCell className="text-right font-mono">{province.povertyRate.toFixed(1)}%</TableCell>
              <TableCell>{getDropoutBadge(province.dropoutRate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
