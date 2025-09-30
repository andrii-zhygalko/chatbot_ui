import type { TConversationItem, ITableData } from './types'
import { generateId, getCurrentTimestamp } from './utils'

const textResponses = [
  'Ciao! Al momento posso mostrarti solo le vendite mensili o gli ultimi utenti. Scrivi "mostrami le vendite mensili" oppure "elenca gli ultimi utenti". ',
  'Funzionalità aggiuntive sono in sviluppo. Prova a scrivere "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Perfetto! Ora prova uno dei comandi supportati: "mostrami le vendite mensili" oppure "elenca gli ultimi utenti".',
  'Al momento posso rispondere a queste richieste: mostrare le vendite mensili o elencare gli ultimi utenti. Scrivi "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Sto ancora imparando! Prova uno di questi comandi: "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Questa parte è ancora in costruzione. Intanto puoi chiedermi le vendite mensili o l’elenco degli ultimi utenti. Prova a scrivere "mostrami le vendite mensili" o "elenca gli ultimi utenti".',
  'Ottimo! Ora scegli cosa vuoi vedere: scrivi "mostrami le vendite mensili" oppure "elenca gli ultimi utenti".',
]

const usersTableData: ITableData = {
  title: 'Ultimi utenti registrati',
  columns: [
    { id: 'id', label: 'ID' },
    { id: 'nome', label: 'Nome' },
    { id: 'email', label: 'Email' },
    { id: 'registratoIl', label: 'Registrato il' },
  ],
  rows: [
    {
      id: '001',
      nome: 'Marco Rossi',
      email: 'marco.rossi@email.com',
      registratoIl: '29/09/2025',
    },
    {
      id: '002',
      nome: 'Giulia Bianchi',
      email: 'giulia.bianchi@email.com',
      registratoIl: '20/09/2025',
    },
    {
      id: '003',
      nome: 'Andrea Ferri',
      email: 'andrea.ferri@email.com',
      registratoIl: '15/08/2025',
    },
    {
      id: '004',
      nome: 'Sara Conti',
      email: 'sara.conti@email.com',
      registratoIl: '12/07/2025',
    },
    {
      id: '005',
      nome: 'Andrea Moretti',
      email: 'andrea.morretti@email.com',
      registratoIl: '11/06/2025',
    },
  ],
}

const TRIGGER_PHRASES = {
  'mostrami le vendite mensili': 'sales',
  'elenca gli ultimi utenti': 'users',
} as const

type TTriggerPhrase = keyof typeof TRIGGER_PHRASES
type TTriggerType = (typeof TRIGGER_PHRASES)[TTriggerPhrase]

export function getTriggerType(message: string): TTriggerType | 'text' {
  const normalizedMessage = message.toLowerCase().trim()

  if (normalizedMessage in TRIGGER_PHRASES) {
    return TRIGGER_PHRASES[normalizedMessage as TTriggerPhrase]
  }
  return 'text'
}

function createBotResponse(userMessage: string): TConversationItem {
  const triggerType = getTriggerType(userMessage)
  const timestamp = getCurrentTimestamp()

  if (triggerType === 'users') {
    return {
      type: 'bot-table',
      id: generateId(),
      timestamp,
      table: usersTableData,
    }
  }

  if (triggerType === 'sales') {
    return {
      type: 'bot',
      id: generateId(),
      timestamp,
      botText: 'Funzionalità grafici in fase di sviluppo.',
    }
  }

  return {
    type: 'bot',
    id: generateId(),
    timestamp,
    botText: textResponses[Math.floor(Math.random() * textResponses.length)],
  }
}

export interface IApiResponse {
  success: boolean
  data?: TConversationItem
  error?: string
}

export async function sendMessage(message: string): Promise<IApiResponse> {
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
