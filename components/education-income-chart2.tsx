"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { educationIncomeData } from "@/data/data"

export function EducationIncomeChart2() {
  // Reverse the data so Universitas appears at top
  const reversedData = [...educationIncomeData].reverse()

  return (
    <ChartContainer
      config={{
        income: {
          label: "Rata-rata Gaji (Rp)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[440px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={reversedData} 
          layout="vertical"
          margin={{ 
            top: 15, 
            right: 30,  
            bottom: 15 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number"
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}`}
            fontSize={10}
            tick={{ fontSize: 10 }}
            label={{ value: 'Rata-rata Gaji (Jutaan Rp)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
          />
          <YAxis 
            type="category"
            dataKey="education" 
            fontSize={10}
            tick={{ fontSize: 10 }}
            width={100}
            label={{ value: 'Tingkat Pendidikan', angle: -90, position: 'insideLeft', offset: 17, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`]}
          />
          <Bar 
            dataKey="income" 
            fill="var(--color-primary)" 
            radius={[0, 4, 4, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}