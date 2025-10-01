import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { ConversationItem } from './ConversationItem'
import { InputBar } from './InputBar'
import { useChat } from '@/hooks/useChat'

export function ChatWindow() {
  const { conversation, sendMessage, clearConversation } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
      isInitialMount.current = false
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversation])

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="flex items-center justify-between px-4 pb-4 border-b">
        <h2 className="text-base font-semibold">Chat</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearConversation}
          disabled={conversation.length === 0}
          title="Cancella conversazione"
          className="text-xs"
        >
          <Trash2 />
          Ripulisci
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            Inizia una conversazione...
          </div>
        ) : (
          <div className="space-y-4">
            {conversation
              .toSorted(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((item) => (
                <ConversationItem key={item.id} item={item} />
              ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <InputBar onSendMessage={sendMessage} maxLength={500} />
    </Card>
  )
}
