import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, className = '', ...props }: Props) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-pink-100 text-pink-700 font-medium rounded hover:bg-pink-200 transition ${className}`}
    >
      {children}
    </button>
  )
}
