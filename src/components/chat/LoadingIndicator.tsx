interface ILoadingIndicatorProps {
  loadingText: string
}

export function LoadingIndicator({ loadingText }: ILoadingIndicatorProps) {
  return (
    <div className="bg-muted text-foreground p-3 rounded-lg max-w-[80%] mr-auto">
      <div className="text-sm text-muted-foreground">{loadingText}</div>
    </div>
  )
}
