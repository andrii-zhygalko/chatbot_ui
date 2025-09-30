import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

interface IInputBarProps {
  onSendMessage: (message: string) => void
  maxLength?: number
}

export function InputBar({ onSendMessage, maxLength = 100 }: IInputBarProps) {
  const [input, setInput] = useState('')
  const remainingChars = maxLength - input.length
  const isNearLimit = remainingChars <= 50
  const isAtLimit = remainingChars <= 0

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (trimmedInput && !isAtLimit) {
      onSendMessage(trimmedInput)
      setInput('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      setInput(newValue)
    }
  }

  return (
    <div className="border-t">
      <form className="p-4 flex gap-2" onSubmit={handleSend}>
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Scrivi un messaggio..."
            className="w-full "
          />
          {isNearLimit && (
            <div
              className={`text-xs mt-1 absolute bottom-[-24px] left-[2px]  ${isAtLimit ? 'text-red-700' : 'text-muted-foreground'}`}
            >
              {remainingChars} caratteri rimanenti
            </div>
          )}
        </div>
        <Button type="submit" size="sm" disabled={!input.trim() || isAtLimit}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Invia</span>
        </Button>
      </form>
    </div>
  )
}
