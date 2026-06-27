import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "new" | "sale"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-secondary text-primary": variant === "default",
          "bg-blue-500 text-white": variant === "new",
          "bg-red-500 text-white": variant === "sale",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
