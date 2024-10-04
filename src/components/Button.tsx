import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Button(
  props: PropsWithChildren<{
    onClick: () => void
    className?: string
    variant?: 'primary' | 'secondary'
    title?: string
  }>
) {
  const computedClassName = twMerge(
    'rounded px-2 py-1 text-lg font-bold transition-all',
    props.variant === 'secondary'
      ? 'bg-white text-purple border border-purple hover:bg-purple hover:text-white'
      : 'bg-purple  text-white  hover:bg-purple-light hover:text-dark',
    props.className
  )

  return (
    <button {...props} className={computedClassName}>
      {props.children}
    </button>
  )
}
