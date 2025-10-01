import { useState, useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

interface IInputBarProps {
  onSendMessage: (message: string) => void
  maxLength?: number
}

export function InputBar({ onSendMessage, maxLength = 500 }: IInputBarProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const remainingChars = maxLength - input.length
  const isNearLimit = remainingChars <= 50
  const isAtLimit = remainingChars <= 0

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'

    const newHeight = Math.min(textarea.scrollHeight, 150)
    textarea.style.height = `${newHeight}px`
  }, [input])

  const handleSend = () => {
    const trimmedInput = input.trim()
    if (trimmedInput && !isAtLimit) {
      onSendMessage(trimmedInput)
      setInput('')
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      setInput(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t">
      <form className="p-4" onSubmit={handleFormSubmit}>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            className="w-full resize-none overflow-y-auto min-h-[40px] pr-12 block
                       [&::-webkit-scrollbar]:w-1.5
                       [&::-webkit-scrollbar-track]:bg-muted/20
                       [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30
                       [&::-webkit-scrollbar-thumb]:rounded-full
                       [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/50
                       scrollbar-thin"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isAtLimit}
            size="icon"
            className="absolute bottom-1 right-2.5 h-8 w-8 rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Invia</span>
          </Button>
          {isNearLimit && (
            <div
              className={`text-xs mt-1 absolute bottom-[-18px] left-[2px]  ${isAtLimit ? 'text-red-700' : 'text-muted-foreground'}`}
            >
              {remainingChars} caratteri rimanenti
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
