import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TConversationItem } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11)
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

export function createErrorMessage(
  timestamp: string,
  errorText: string
): Extract<TConversationItem, { type: 'bot' }> {
  return {
    type: 'bot',
    id: generateId(),
    timestamp,
    botText: errorText,
  }
}
