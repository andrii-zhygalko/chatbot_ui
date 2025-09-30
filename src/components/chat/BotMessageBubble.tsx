interface IBotMessageBubbleProps {
  botText: string
  timestamp: string
}

export function BotMessageBubble({
  botText,
  timestamp,
}: IBotMessageBubbleProps) {
  return (
    <div className="bg-muted text-foreground p-3 rounded-lg max-w-[80%] mr-auto">
      <div className="text-sm break-words">{botText}</div>
      <div className="text-xs opacity-70 mt-1">
        {new Date(timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
