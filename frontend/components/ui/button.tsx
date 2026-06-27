import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: "sm" | "md" | "lg"
  }
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-secondary text-primary hover:bg-secondary-hover": variant === "primary",
          "bg-primary-light text-text-primary hover:bg-[#3d3d3d]": variant === "secondary",
          "bg-transparent text-text-primary hover:bg-white/10": variant === "ghost",
          "border border-border-dark bg-transparent text-text-primary hover:bg-white/10": variant === "outline",
        },
        {
          "h-9 px-3 text-sm": size === "sm",
          "h-11 px-5 text-sm": size === "md",
          "h-12 px-8 text-base": size === "lg",
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
