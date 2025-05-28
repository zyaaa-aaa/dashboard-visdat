"use client"

import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface CorrelationData {
  name: string
  povertyRate: number
  dropoutRate: number
  kipkPerCapita: number
}

interface CorrelationChartProps {
  data: CorrelationData[]
}

export function CorrelationChart({ data }: CorrelationChartProps) {
  const scatterData = data.map((item) => ({
    ...item,
    size: item.kipkPerCapita * 10, // Scale for bubble size
  }))

  return (
    <ChartContainer
      config={{
        dropoutRate: {
          label: "Tingkat Putus Kuliah (%)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart data={scatterData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="povertyRate" name="Tingkat Kemiskinan (%)" fontSize={12} />
          <YAxis dataKey="dropoutRate" name="Tingkat Putus Kuliah (%)" fontSize={12} />
          <ZAxis dataKey="size" range={[50, 400]} />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm">Kemiskinan: {data.povertyRate.toFixed(1)}%</p>
                    <p className="text-sm">Putus Kuliah: {data.dropoutRate.toFixed(1)}%</p>
                    <p className="text-sm">KIP-K per Kapita: {data.kipkPerCapita.toFixed(1)}%</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter dataKey="dropoutRate" fill="var(--color-dropoutRate)" fillOpacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
