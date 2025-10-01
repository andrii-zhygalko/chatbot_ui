import { useEffect, useRef } from 'react'
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
    <div className="flex flex-col h-dvh md:max-w-4xl md:mx-auto md:border-x md:shadow-xl bg-background">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-4 border-b bg-gradient-to-t from-white via-gray-100 to-gray-200">
        <h2 className="text-sm sm:text-base font-semibold">
          Chat con l'assistente
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearConversation}
          disabled={conversation.length === 0}
          title="Cancella conversazione"
          className="text-xs px-2 sm:px-3"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div
        className="flex-1 p-3 sm:p-4 overflow-y-auto
                      [&::-webkit-scrollbar]:w-1.5
                      [&::-webkit-scrollbar-track]:bg-muted/20
                      [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30
                      [&::-webkit-scrollbar-thumb]:rounded-full
                      [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/50
                      scrollbar-thin"
      >
        {conversation.length === 0 ? (
          <div className="text-center text-muted-foreground mt-6 sm:mt-8 text-sm">
            Inizia una conversazione...
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
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
    </div>
  )
}
