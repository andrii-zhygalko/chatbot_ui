import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { TConversationItem } from '@/lib/types'
import { ConversationItem } from './ConversationItem'
import {
  createErrorMessage,
  generateId,
  getCurrentTimestamp,
} from '@/lib/utils'
import { sendMessage } from '@/lib/mockApi'
import { InputBar } from './InputBar'

export function ChatWindow() {
  const [conversation, setConversation] = useState<TConversationItem[]>([])

  const addMessage = async (content: string) => {
    const timestamp = getCurrentTimestamp()

    const userMessage: TConversationItem = {
      id: generateId(),
      timestamp,
      type: 'user',
      content,
    }

    const loadingId = generateId()
    const loadingMessage: TConversationItem = {
      id: loadingId,
      timestamp,
      type: 'loading',
      loadingText: 'Bot sta scrivendo...',
    }

    setConversation((prev) => [...prev, userMessage, loadingMessage])

    let botResponse: TConversationItem

    try {
      const response = await sendMessage(content)

      if (response.success && response.data) {
        botResponse = response.data
      } else {
        botResponse = createErrorMessage(
          timestamp,
          'Si è verificato un errore. Si prega di riprovare.'
        )
      }
    } catch (error) {
      console.error('Errore di rete:', error)
      botResponse = createErrorMessage(
        timestamp,
        'Errore di rete. Si prega di riprovare.'
      )
    }

    setConversation((prev) =>
      prev.map((item) => (item.id === loadingId ? botResponse : item))
    )
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
            {conversation
              .toSorted(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((item) => (
                <ConversationItem key={item.id} item={item} />
              ))}
          </div>
        )}
      </div>

      <InputBar onSendMessage={addMessage} maxLength={500} />
    </Card>
  )
}
