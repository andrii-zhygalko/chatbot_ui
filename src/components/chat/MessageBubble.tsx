import { Message } from '@/lib/types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className="bg-primary/85 text-primary-foreground p-3 rounded-lg max-w-[80%] ml-auto">
      <div className="text-sm break-words">{message.content}</div>
      <div className="text-xs opacity-70 mt-1">
        {new Date(message.timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
