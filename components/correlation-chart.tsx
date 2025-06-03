import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react"

interface CorrelationData {
  name: string
  povertySum: number
  dropoutRate: number
  kipk: number
}

interface CorrelationChartProps {
  data: CorrelationData[]
}

interface ViewState {
  centerX: number
  centerY: number
  zoomLevel: number
}

export function CorrelationChart({ data }: CorrelationChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  
  // Calculate initial bounds dari semua data
  const dataBounds = useMemo(() => {
    const xValues = data.map(d => d.povertySum)
    const yValues = data.map(d => d.kipk)
    
    return {
      minX: Math.min(...xValues),
      maxX: Math.max(...xValues),
      minY: Math.min(...yValues),
      maxY: Math.max(...yValues)
    }
  }, [data])

  // Calculate dropout rate bounds untuk scaling yang lebih baik
  const dropoutBounds = useMemo(() => {
    const rates = data.map(d => d.dropoutRate)
    return {
      min: Math.min(...rates),
      max: Math.max(...rates)
    }
  }, [data])

  // Initial view state
  const initialViewState = useMemo(() => ({
    centerX: (dataBounds.minX + dataBounds.maxX) / 2,
    centerY: (dataBounds.minY + dataBounds.maxY) / 2,
    zoomLevel: 1
  }), [dataBounds])

  const [viewState, setViewState] = useState<ViewState>(initialViewState)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [lastPanPosition, setLastPanPosition] = useState({ x: 0, y: 0 })

  // Calculate visible domain berdasarkan view state
  const visibleDomain = useMemo(() => {
    const baseWidth = dataBounds.maxX - dataBounds.minX
    const baseHeight = dataBounds.maxY - dataBounds.minY
    
    // Zoom membuat area visible menjadi lebih kecil
    const visibleWidth = (baseWidth * 2) / viewState.zoomLevel // * 2 untuk padding
    const visibleHeight = (baseHeight * 2) / viewState.zoomLevel
    
    return {
      x: [viewState.centerX - visibleWidth/2, viewState.centerX + visibleWidth/2] as [number, number],
      y: [viewState.centerY - visibleHeight/2, viewState.centerY + visibleHeight/2] as [number, number]
    }
  }, [viewState, dataBounds])

  // Filter data yang visible dalam current domain dengan scaling bubble yang signifikan
  const visibleData = useMemo(() => {
    return data.filter(item => 
      item.povertySum >= visibleDomain.x[0] && 
      item.povertySum <= visibleDomain.x[1] &&
      item.kipk >= visibleDomain.y[0] && 
      item.kipk <= visibleDomain.y[1]
    ).map(item => {
      // Normalize dropout rate ke range 0-1
      const normalizedRate = (item.dropoutRate - dropoutBounds.min) / (dropoutBounds.max - dropoutBounds.min)
      
      // Gunakan scaling eksponensial untuk perbedaan yang lebih dramatis
      const exponentialScale = Math.pow(normalizedRate, 0.7) // Eksponensial dengan power 0.7
      
      // Map ke range size yang lebih besar dan signifikan
      const minSize = 40
      const maxSize = 300
      const size = minSize + (exponentialScale * (maxSize - minSize))
      
      return {
        ...item,
        size: Math.max(size, minSize)
      }
    })
  }, [data, visibleDomain, dropoutBounds])

  // Zoom functions
  const zoomIn = useCallback(() => {
    setViewState(prev => ({
      ...prev,
      zoomLevel: Math.min(prev.zoomLevel * 1.5, 50) // Max zoom 50x
    }))
  }, [])

  const zoomOut = useCallback(() => {
    setViewState(prev => ({
      ...prev,
      zoomLevel: Math.max(prev.zoomLevel / 1.5, 0.1) // Min zoom 0.1x
    }))
  }, [])

  const resetZoom = useCallback(() => {
    setViewState(initialViewState)
  }, [initialViewState])

  // Mouse handlers untuk dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
      setLastPanPosition({ x: viewState.centerX, y: viewState.centerY })
      e.preventDefault()
    }
  }, [viewState.centerX, viewState.centerY])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    // Convert pixel movement to data coordinates
    const chartWidth = chartRef.current?.clientWidth || 400
    const chartHeight = chartRef.current?.clientHeight || 400
    
    const dataRangeX = visibleDomain.x[1] - visibleDomain.x[0]
    const dataRangeY = visibleDomain.y[1] - visibleDomain.y[0]
    
    const moveX = -(deltaX / chartWidth) * dataRangeX
    const moveY = (deltaY / chartHeight) * dataRangeY // Invert Y axis
    
    setViewState(prev => ({
      ...prev,
      centerX: lastPanPosition.x + moveX,
      centerY: lastPanPosition.y + moveY
    }))
  }, [isDragging, dragStart, lastPanPosition, visibleDomain])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp)
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          disabled={viewState.zoomLevel >= 50}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          disabled={viewState.zoomLevel <= 0.1}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetZoom}
          disabled={viewState.zoomLevel === 1 && viewState.centerX === initialViewState.centerX && viewState.centerY === initialViewState.centerY}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Move className="h-4 w-4" />
          <span>Zoom: {viewState.zoomLevel.toFixed(1)}x</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <div 
          ref={chartRef}
          className={`w-full h-[352px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ userSelect: 'none' }}
        >
          <ChartContainer
            config={{
              kipk: {
                label: "KIP-K per Kapita (%)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart 
                data={visibleData} 
                margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  type="number"
                  dataKey="povertySum" 
                  name="Jumlah Penduduk Miskin" 
                  fontSize={12}
                  domain={visibleDomain.x}
                  label={{ value: 'Jumlah Penduduk Miskin', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) {
                      return `${(value / 1000000).toFixed(1)}M`
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}K`
                    }
                    return value.toString()
                  }}
                />
                <YAxis 
                  type="number"
                  dataKey="kipk" 
                  name="KIP-K" 
                  fontSize={12}
                  domain={visibleDomain.y}
                  label={{ value: 'Jumlah Penerima KIP-K', angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
                  tickFormatter={(value) => `${value.toFixed(1)}`}
                />
                <ZAxis dataKey="size" range={[40, 300]} />
                <ChartTooltip
                  animationDuration={0}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-background p-3 border rounded-lg shadow-lg max-w-xs">
                          <p className="font-semibold text-sm">{data.name}</p>
                          <div className="text-xs space-y-1 mt-2">
                            <p>Penduduk Miskin: {data.povertySum.toLocaleString()}</p>
                            <p>KIP-K: {data.kipk.toLocaleString()}</p>
                            <p className="font-medium">Tingkat Putus Kuliah: {data.dropoutRate.toFixed(2)}%</p>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter 
                  dataKey="kipk" 
                  fill="var(--color-warning)" 
                  fillOpacity={0.7}
                  stroke="var(--color-warning)"
                  strokeWidth={1}
                  isAnimationActive={false}
                  animationDuration={0}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Overlay instructions */}
        <div className="absolute top-2 right-2 bg-muted-foreground/50 text-background text-xs p-2 rounded pointer-events-none max-w-48">
          <div>• Ukuran Bubble: Tingkat Putus Kuliah</div>
        </div>
      </div>
    </div>
  )
}