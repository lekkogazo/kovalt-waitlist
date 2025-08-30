import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

const ButtonRefined = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'md', variant = 'default', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }

    const variantClasses = {
      default: 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50',
      outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100'
    }

    return (
      <button
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ButtonRefined.displayName = "ButtonRefined"

export { ButtonRefined }