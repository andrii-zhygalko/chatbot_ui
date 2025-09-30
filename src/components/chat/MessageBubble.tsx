interface IMessageBubbleProps {
  content: string
  timestamp: string
}

export function MessageBubble({ content, timestamp }: IMessageBubbleProps) {
  return (
    <div className="bg-primary/85 text-primary-foreground p-3 rounded-lg max-w-[80%] ml-auto">
      <div className="text-sm break-words">{content}</div>
      <div className="text-xs opacity-70 mt-1">
        {new Date(timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
