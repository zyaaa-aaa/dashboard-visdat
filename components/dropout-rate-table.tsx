"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Province {
  name: string
  dropoutRate: number
  students: number
  povertySum: number
}

interface DropoutRateTableProps {
  data: Province[]
}

export function DropoutRateTable({ data }: DropoutRateTableProps) {
  const sortedData = [...data].sort((a, b) => b.dropoutRate - a.dropoutRate)

  return (
    <div className="h-[420px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-normal w-auto">Provinsi</TableHead>
            <TableHead className="text-right whitespace-normal w-auto">
              Putus<br />Kuliah
            </TableHead>
            <TableHead className="text-right whitespace-normal w-auto">
              Total<br />Mahasiswa
            </TableHead>
            <TableHead className="text-right whitespace-normal w-auto">
              Jumlah<br />Penduduk Miskin
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
