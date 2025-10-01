import { IChartData } from '@/lib/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'

interface IBotBarChartProps {
  chart: IChartData
  timestamp: string
}

const year = new Date().getFullYear()

function formatMonthShort(month: number): string {
  const date = new Date(year, month - 1)
  const monthName = date.toLocaleDateString('it-IT', { month: 'short' })
  return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}

function formatMonthLong(month: number): string {
  const date = new Date(new Date().getFullYear(), month - 1)
  const monthName = date.toLocaleDateString('it-IT', { month: 'long' })
  return monthName.charAt(0).toUpperCase() + monthName.slice(1)
}

export function BotBarChart({ chart, timestamp }: IBotBarChartProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <article
      className="bg-muted text-foreground p-3 rounded-lg max-w-[90%] mr-auto"
      aria-label={`Grafico: ${chart.title}`}
    >
      <h3 className="text-sm font-semibold mb-3">{chart.title}</h3>
      <div className="rounded-md border bg-background p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chart.data}
            margin={
              isMobile
                ? { top: 20, right: 5, left: -20, bottom: 0 }
                : { top: 5, right: 20, left: 10, bottom: 20 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={chart.xKey}
              interval={0}
              tickFormatter={(month) =>
                typeof month === 'number' ? formatMonthShort(month) : month
              }
              tick={{ fontSize: 12 }}
              hide={isMobile}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => `€${value.toLocaleString('it-IT')}`}
              labelFormatter={(month) =>
                typeof month === 'number' ? formatMonthLong(month) : month
              }
              separator=": "
            />
            <Bar dataKey={chart.yKey} fill="var(--accent)" name="Valore">
              {isMobile && (
                <LabelList
                  dataKey="label"
                  position="insideBottom"
                  angle={-90}
                  fill="var(--background)"
                  fontSize={12}
                  offset={15}
                  formatter={(month) =>
                    typeof month === 'number' ? formatMonthShort(month) : month
                  }
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs opacity-70 mt-2">
        {new Date(timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </article>
  )
}
