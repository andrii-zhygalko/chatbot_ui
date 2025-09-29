import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11)
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString()
}

const TRIGGER_PHRASES = {
  'mostrami le vendite mensili': 'sales',
  'elenca gli ultimi utenti': 'users',
} as const

type TriggerPhrase = keyof typeof TRIGGER_PHRASES
type TriggerType = (typeof TRIGGER_PHRASES)[TriggerPhrase]

export function getTriggerType(message: string): TriggerType | 'text' {
  const normalizedMessage = message.toLowerCase().trim()

  if (normalizedMessage in TRIGGER_PHRASES) {
    return TRIGGER_PHRASES[normalizedMessage as TriggerPhrase]
  }
  return 'text'
}
