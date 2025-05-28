"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Province {
  name: string
  dropoutRate: number
  povertySum: number
}

interface ProvincePovertyChartProps {
  data: Province[]
}

export function ProvincePovertyChart({ data }: ProvincePovertyChartProps) {
  const sortedData = [...data].sort((a, b) => b.dropoutRate - a.dropoutRate).slice(0, 10) // Show top 10 provinces with highest dropout rates

  return (
    <ChartContainer
      config={{
        dropoutRate: {
          label: "Tingkat Putus Kuliah (%)",
          color: "hsl(var(--chart-1))",
        },
        povertySum: {
          label: "Jumlah Penduduk Miskin",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={10} />
          <YAxis fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="dropoutRate"
            fill="var(--color-dropoutRate)"
            radius={[4, 4, 0, 0]}
            name="Tingkat Putus Kuliah (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
