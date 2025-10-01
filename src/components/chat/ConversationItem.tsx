import { TConversationItem } from '@/lib/types'
import { MessageBubble } from './MessageBubble'
import { BotMessageBubble } from './BotMessageBubble'
import { BotTable } from '../bot-responses/BotTable'
import { BotBarChart } from '../bot-responses/BotBarChart'
import { LoadingIndicator } from './LoadingIndicator'

export function ConversationItem({ item }: { item: TConversationItem }) {
  switch (item.type) {
    case 'user':
      return <MessageBubble content={item.content} timestamp={item.timestamp} />
    case 'bot':
      return (
        <BotMessageBubble botText={item.botText} timestamp={item.timestamp} />
      )
    case 'bot-table':
      return <BotTable table={item.table} timestamp={item.timestamp} />
    case 'bot-chart':
      return <BotBarChart chart={item.chart} timestamp={item.timestamp} />
    case 'loading':
      return <LoadingIndicator loadingText={item.loadingText} />
    default: {
      const _exhaustiveCheck: never = item
      void _exhaustiveCheck
      return null
    }
  }
}
