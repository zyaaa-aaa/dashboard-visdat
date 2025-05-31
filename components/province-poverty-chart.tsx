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
  const sortedData = [...data].sort((a, b) => b.dropoutRate - a.dropoutRate).slice(0, 10)

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
      className="h-[230px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={sortedData} 
          margin={{ 
            top: 15, 
            right: 15, 
            left: 15, 
            bottom: 70 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={20}
            fontSize={10}
            interval={0}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            fontSize={10}
            tick={{ fontSize: 10 }}
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="dropoutRate"
            fill="var(--color-dropoutRate)"
            radius={[2, 2, 0, 0]}
            name="Tingkat Putus Kuliah (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}