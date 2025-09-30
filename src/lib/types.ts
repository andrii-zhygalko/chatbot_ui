export interface ITableData {
  title: string
  columns: Array<{ id: string; label: string }>
  rows: Array<Record<string, string | number>>
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
