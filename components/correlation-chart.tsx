"use client"

import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface CorrelationData {
  name: string
  povertySum: number
  dropoutRate: number
  kipk: number
}

interface CorrelationChartProps {
  data: CorrelationData[]
}

export function CorrelationChart({ data }: CorrelationChartProps) {
  // Sort data by povertySum for consistent display
  const sortedData = [...data].sort((a, b) => a.povertySum - b.povertySum)
  
  const scatterData = sortedData.map((item) => ({
    ...item,
    size: item.dropoutRate * 20, // Multiply by 20 for better visibility
  }))

  // Calculate nice tick values for X-axis (poverty)
  const maxPoverty = Math.max(...data.map(d => d.povertySum))
  const minPoverty = Math.min(...data.map(d => d.povertySum))
  
  // Create evenly spaced ticks for X-axis
  const tickCount = 5
  const tickInterval = (maxPoverty - minPoverty) / (tickCount - 1)
  const xAxisTicks = Array.from({ length: tickCount }, (_, i) => 
    Math.round(minPoverty + (i * tickInterval))
  )

  return (
    <ChartContainer
      config={{
        kipk: {
          label: "KIP-K per Kapita (%)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[363px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart 
          data={scatterData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            dataKey="povertySum" 
            name="Jumlah Penduduk Miskin" 
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            ticks={xAxisTicks}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            type="number"
            dataKey="kipk" 
            name="KIP-K per Kapita (%)" 
            fontSize={12}
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <ZAxis dataKey="size" range={[50, 400]} />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm">Kemiskinan: {data.povertySum.toLocaleString()}</p>
                    <p className="text-sm">KIP-K per Kapita: {data.kipk.toFixed(1)}%</p>
                    <p className="text-sm">Putus Kuliah: {data.dropoutRate.toFixed(1)}%</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter dataKey="kipk" fill="var(--color-kipk)" fillOpacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}