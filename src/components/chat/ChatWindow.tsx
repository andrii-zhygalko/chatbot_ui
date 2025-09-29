import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ConversationItem } from '@/lib/types'
import { generateId, getCurrentTimestamp } from '@/lib/utils'
import { sendMessage } from '@/lib/mockApi'
import { MessageBubble } from './MessageBubble'
import { BotMessageBubble } from './BotMessageBubble'
import { InputBar } from './InputBar'

export function ChatWindow() {
  const [conversation, setConversation] = useState<ConversationItem[]>([])

  const addMessage = async (content: string) => {
    const timestamp = getCurrentTimestamp()

    const userMessage: ConversationItem = {
      id: generateId(),
      timestamp,
      type: 'user',
      content,
    }

    const loadingId = generateId()
    const loadingMessage: ConversationItem = {
      id: loadingId,
      timestamp,
      type: 'loading',
      loadingText: 'Bot sta scrivendo...',
    }

    setConversation((prev) => [...prev, userMessage, loadingMessage])

    try {
      const response = await sendMessage(content)

      setConversation((prev) =>
        prev.map((item) =>
          item.id === loadingId
            ? {
                id: generateId(),
                timestamp,
                type: 'bot',
                botText:
                  response.success && response.data
                    ? response.data.text
                    : 'Si è verificato un errore. Si prega di riprovare.',
              }
            : item
        )
      )
    } catch (error) {
      console.error('Errore di rete:', error)

      setConversation((prev) =>
        prev.map((item) =>
          item.id === loadingId
            ? {
                id: generateId(),
                timestamp,
                type: 'bot',
                botText: 'Errore di rete. Si prega di riprovare.',
              }
            : item
        )
      )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            Inizia una conversazione...
          </div>
        ) : (
          <div className="space-y-4">
            {[...conversation]
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((item) => {
                if (item.type === 'user') {
                  return (
                    <MessageBubble
                      key={item.id}
                      message={{
                        id: item.id,
                        content: item.content,
                        sender: 'user',
                        timestamp: item.timestamp,
                      }}
                    />
                  )
                }

                if (item.type === 'bot') {
                  return (
                    <BotMessageBubble
                      key={item.id}
                      response={{
                        id: item.id,
                        text: item.botText,
                        timestamp: item.timestamp,
                      }}
                    />
                  )
                }

                if (item.type === 'loading') {
                  return (
                    <div
                      key={item.id}
                      className="bg-muted text-foreground p-3 rounded-lg max-w-[80%] mr-auto"
                    >
                      <div className="text-sm text-muted-foreground">
                        {item.loadingText}
                      </div>
                    </div>
                  )
                }

                return null
              })}
          </div>
        )}
      </div>

      <InputBar onSendMessage={addMessage} maxLength={500} />
    </Card>
  )
}
