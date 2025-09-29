import { BotTextResponse } from '@/lib/types'

interface BotMessageBubbleProps {
  response: BotTextResponse
}

export function BotMessageBubble({ response }: BotMessageBubbleProps) {
  return (
    <div className="bg-muted text-foreground p-3 rounded-lg max-w-[80%] mr-auto">
      <div className="text-sm break-words">{response.text}</div>
      <div className="text-xs opacity-70 mt-1">
        {new Date(response.timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
