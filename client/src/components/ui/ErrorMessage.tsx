interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-3">
      <p className="text-sm text-zinc-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-red-500 hover:text-red-400 underline transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
