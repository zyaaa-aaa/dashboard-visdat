"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Province {
  name: string
  kipkRecipients: number
  students: number
}

interface KipkDistributionChartProps {
  data: Province[]
}

export function KipkDistributionChart({ data }: KipkDistributionChartProps) {
  const sortedData = [...data].sort((a, b) => b.kipkRecipients - a.kipkRecipients).slice(0, 10) // Show top 10 provinces with most KIP-K recipients

  return (
    <ChartContainer
      config={{
        kipkRecipients: {
          label: "Penerima KIP-K",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={10} />
          <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} fontSize={12} />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [value.toLocaleString("id-ID"), "Penerima KIP-K"]}
          />
          <Bar dataKey="kipkRecipients" fill="var(--color-kipkRecipients)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
