interface IBotMessageBubbleProps {
  botText: string
  timestamp: string
}

export function BotMessageBubble({
  botText,
  timestamp,
}: IBotMessageBubbleProps) {
  return (
    <div className="bg-muted text-foreground p-3 rounded-lg max-w-[95%] sm:max-w-[75%] mr-auto">
      <div className="text-sm sm:text-base break-words">{botText}</div>
      <div className="text-[10px] sm:text-xs opacity-70 mt-1">
        {new Date(timestamp).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  )
}
