export interface ITableData {
  title: string
  columns: Array<{ id: string; label: string }>
  rows: Array<Record<string, string | number>>
}

export interface IChartData {
  title: string
  data: Array<{ label: string | number; value: number }>
  xKey: string
  yKey: string
}

export type TConversationItem =
  | {
      type: 'user'
      id: string
      timestamp: string
      content: string
    }
  | {
      type: 'bot'
      id: string
      timestamp: string
      botText: string
    }
  | {
      type: 'loading'
      id: string
      timestamp: string
      loadingText: string
    }
  | {
      type: 'bot-table'
      id: string
      timestamp: string
      table: ITableData
    }
  | {
      type: 'bot-chart'
      id: string
      timestamp: string
      chart: IChartData
    }
