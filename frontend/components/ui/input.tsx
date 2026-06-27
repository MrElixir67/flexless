import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ className, label, id, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "flex h-11 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-text-body placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent",
          className,
        )}
        {...props}
      />
    </div>
  )
}
