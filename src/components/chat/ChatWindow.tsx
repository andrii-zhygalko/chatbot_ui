import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Message } from '@/lib/types'
import { generateId } from '@/lib/utils'
import { MessageBubble } from './MessageBubble'
import { InputBar } from './InputBar'

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])

  const addMessage = (content: string) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            Inizia una conversazione...
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      <InputBar onSendMessage={addMessage} maxLength={500} />
    </Card>
  )
}
