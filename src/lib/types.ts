export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

export interface BotTextResponse {
  id: string
  text: string
  timestamp: string
}

export interface ApiResponse {
  success: boolean
  data?: BotTextResponse
  error?: string
}

export type ConversationItem =
  | {
      type: 'user'
      id: string
      timestamp: string
      content: string
    }
  | {
      type: 'bot'
      id: string
      timestamp: string
      botText: string
    }
  | {
      type: 'loading'
      id: string
      timestamp: string
      loadingText: string
    }
