import type { TConversationItem } from './types'

const STORAGE_KEY = 'chatbot_conversation'
const MAX_STORAGE_SIZE = 1024 * 1024
const MAX_MESSAGES = 50

function isValidConversation(data: unknown): data is TConversationItem[] {
  if (!Array.isArray(data)) return false

  return data.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      'id' in item &&
      'timestamp' in item
  )
}

export function saveConversation(conversation: TConversationItem[]): void {
  try {
    const serialized = JSON.stringify(conversation)

    if (serialized.length > MAX_STORAGE_SIZE) {
      const trimmed = conversation.slice(-MAX_MESSAGES)
      const trimmedSerialized = JSON.stringify(trimmed)
      localStorage.setItem(STORAGE_KEY, trimmedSerialized)
      console.warn(
        `Conversation trimmed to last ${MAX_MESSAGES} messages due to size limit`
      )
    } else {
      localStorage.setItem(STORAGE_KEY, serialized)
    }
  } catch (error) {
    console.error('Failed to save conversation:', error)
  }
}

export function loadConversation(): TConversationItem[] {
  try {
    const serializedConversation = localStorage.getItem(STORAGE_KEY)
    if (!serializedConversation) return []

    const parsedConversation: unknown = JSON.parse(serializedConversation)

    if (isValidConversation(parsedConversation)) {
      return parsedConversation
    } else {
      console.warn(
        'Invalid conversation data in localStorage, clearing local storage...'
      )
      clearConversation()
      return []
    }
  } catch (error) {
    console.error('Failed to load conversation:', error)
    return []
  }
}

export function clearConversation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear conversation:', error)
  }
}
