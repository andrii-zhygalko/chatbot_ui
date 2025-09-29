import type { BotTextResponse, ApiResponse } from './types'
import { generateId, getCurrentTimestamp } from './utils'

const textResponses = [
  'Ciao! Al momento posso mostrarti solo le vendite mensili o gli ultimi utenti.',
  'Funzionalità aggiuntive sono in sviluppo. Prova a scrivere "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Perfetto! Ora prova uno dei comandi supportati: "mostrami le vendite mensili" oppure "elenca gli ultimi utenti".',
  'Al momento posso rispondere solo a due richieste: mostrare le vendite mensili o elencare gli ultimi utenti.',
  'Sto ancora imparando! Prova uno di questi comandi: "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Questa parte è ancora in costruzione. Intanto puoi chiedermi le vendite mensili o l’elenco degli ultimi utenti.',
  'Ottimo! Ora scegli cosa vuoi vedere: scrivi "mostrami le vendite mensili" oppure "elenca gli ultimi utenti".',
]

const TRIGGER_RESPONSES = {
  'mostrami le vendite mensili': 'Funzionalità grafici in fase di sviluppo.',
  'elenca gli ultimi utenti': 'Funzionalità tabelle in fase di sviluppo.',
} as const

function createBotResponse(userMessage: string): BotTextResponse {
  const normalizedMessage = userMessage.toLowerCase().trim()

  const triggerResponse =
    TRIGGER_RESPONSES[normalizedMessage as keyof typeof TRIGGER_RESPONSES]

  const responseText =
    triggerResponse ||
    textResponses[Math.floor(Math.random() * textResponses.length)]

  return {
    id: generateId(),
    text: responseText,
    timestamp: getCurrentTimestamp(),
  }
}

export async function sendMessage(message: string): Promise<ApiResponse> {
  const delay = Math.random() * 1000 + 1000

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const response = createBotResponse(message)
        resolve({
          success: true,
          data: response,
        })
      } catch {
        resolve({
          success: false,
          error: 'Si è verificato un errore. Si prega di riprovare.',
        })
      }
    }, delay)
  })
}
