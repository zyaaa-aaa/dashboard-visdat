"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { educationIncomeData } from "@/data/data"

export function EducationIncomeChart() {
  return (
    <ChartContainer
      config={{
        income: {
          label: "Rata-rata Gaji (Rp)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={educationIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="education" angle={-45} textAnchor="end" height={80} fontSize={12} />
          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} fontSize={12} />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, "Rata-rata Gaji"]}
          />
          <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
