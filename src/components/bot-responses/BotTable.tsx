import { ITableData } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface IBotTableProps {
  table: ITableData
  timestamp: string
}

export function BotTable({ table, timestamp }: IBotTableProps) {
  return (
    <article
      className="bg-muted text-foreground p-3 rounded-lg max-w-[98%] sm:max-w-[85%] mr-auto"
      aria-label={`Tabella: ${table.title}`}
    >
      <h3 className="text-sm font-semibold mb-3">{table.title}</h3>
      <div className="overflow-x-auto rounded-md border-2 border-table/50">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="border-b-2 border-table/70 bg-muted/50">
              {table.columns.map((column) => (
                <TableHead key={column.id} scope="col">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, index) => (
              <TableRow
                key={`row-${index}`}
                className="border-b border-table/50"
              >
                {table.columns.map((column) => (
                  <TableCell key={`${index}-${column.id}`}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
