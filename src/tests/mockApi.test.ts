import { sendMessage } from '../lib/mockApi'

describe('Mock API', () => {
  describe('Trigger phrase detection', () => {
    it('should return table data for "elenca gli ultimi utenti"', async () => {
      const result = await sendMessage('elenca gli ultimi utenti')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.type).toBe('bot-table')

      if (result.data?.type === 'bot-table') {
        expect(result.data.table.title).toBe('Ultimi utenti registrati')
        expect(result.data.table.columns).toHaveLength(4)
        expect(result.data.table.rows).toHaveLength(5)
      }
    })

    it('should return chart data for "mostrami le vendite mensili"', async () => {
      const result = await sendMessage('mostrami le vendite mensili')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.type).toBe('bot-chart')

      if (result.data?.type === 'bot-chart') {
        expect(result.data.chart.title).toBe('Vendite mensili (EUR)')
        expect(result.data.chart.data).toHaveLength(12)
        expect(result.data.chart.xKey).toBe('label')
        expect(result.data.chart.yKey).toBe('value')
      }
    })

    it('should return text response for unknown messages', async () => {
      const result = await sendMessage('ciao come stai?')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.type).toBe('bot')

      if (result.data?.type === 'bot') {
        expect(result.data.botText).toBeTruthy()
        expect(typeof result.data.botText).toBe('string')
      }
    })

    it('should handle trigger phrases case-insensitively', async () => {
      const resultLower = await sendMessage('elenca gli ultimi utenti')
      const resultUpper = await sendMessage('ELENCA GLI ULTIMI UTENTI')
      const resultMixed = await sendMessage('Elenca Gli Ultimi Utenti')

      expect(resultLower.data?.type).toBe('bot-table')
      expect(resultUpper.data?.type).toBe('bot-table')
      expect(resultMixed.data?.type).toBe('bot-table')
    }, 10000)

    it('should trim whitespace from messages', async () => {
      const result = await sendMessage('  mostrami le vendite mensili  ')

      expect(result.success).toBe(true)
      expect(result.data?.type).toBe('bot-chart')
    })
  })

  describe('Response structure', () => {
    it('should include required fields in all responses', async () => {
      const result = await sendMessage('test')

      expect(result.data).toBeDefined()
      expect(result.data?.id).toBeTruthy()
      expect(result.data?.timestamp).toBeTruthy()
      expect(result.data?.type).toBeTruthy()

      if (result.data?.timestamp) {
        const date = new Date(result.data.timestamp)
        expect(date.toISOString()).toBe(result.data.timestamp)
      }
    })

    it('should generate unique IDs for each response', async () => {
      const result1 = await sendMessage('test 1')
      const result2 = await sendMessage('test 2')

      expect(result1.data?.id).not.toBe(result2.data?.id)
    })
  })

  describe('Error handling', () => {
    it('should return success: true for valid messages', async () => {
      const result = await sendMessage('hello')

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
    })
  })
})
