import { useState, useEffect } from 'react'
import type { TConversationItem } from '@/lib/types'
import {
  createErrorMessage,
  generateId,
  getCurrentTimestamp,
} from '@/lib/utils'
import { sendMessage as sendMessageApi } from '@/lib/mockApi'
import {
  saveConversation,
  loadConversation,
  clearConversation as clearStorage,
} from '@/lib/storage'

interface IUseChatReturn {
  conversation: TConversationItem[]
  sendMessage: (content: string) => Promise<void>
  clearConversation: () => void
}

export function useChat(): IUseChatReturn {
  const [conversation, setConversation] = useState<TConversationItem[]>(() => {
    if (typeof window !== 'undefined') {
      return loadConversation()
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveConversation(conversation)
    }
  }, [conversation])

  const sendMessage = async (content: string): Promise<void> => {
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
      loadingText: 'Bot sta scrivendo',
    }

    setConversation((prev) => [...prev, userMessage, loadingMessage])

    let botResponse: TConversationItem

    try {
      const response = await sendMessageApi(content)

      if (response.success && response.data) {
        botResponse = response.data
      } else {
        botResponse = createErrorMessage(
          timestamp,
          'Si è verificato un errore. Si prega di riprovare.'
        )
      }
    } catch (error) {
      console.error('Network error:', error)
      botResponse = createErrorMessage(
        timestamp,
        'Errore di rete. Si prega di riprovare.'
      )
    }

    setConversation((prev) =>
      prev.map((item) => (item.id === loadingId ? botResponse : item))
    )
  }

  const clearConversation = (): void => {
    setConversation([])
    clearStorage()
  }

  return {
    conversation,
    sendMessage,
    clearConversation,
  }
}
