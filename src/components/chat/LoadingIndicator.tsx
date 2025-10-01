interface ILoadingIndicatorProps {
  loadingText: string
}

export function LoadingIndicator({ loadingText }: ILoadingIndicatorProps) {
  return (
    <div className="bg-muted text-foreground p-3 rounded-lg max-w-[80%] mr-auto">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        {loadingText}
        <span className="font-bold animate-bounce [animation-delay:0ms]">
          .
        </span>
        <span className="font-bold animate-bounce [animation-delay:150ms]">
          .
        </span>
        <span className="font-bold animate-bounce [animation-delay:300ms]">
          .
        </span>
      </div>
    </div>
  )
}
