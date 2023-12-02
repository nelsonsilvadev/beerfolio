import { FC } from 'react'

interface IButton {
  title: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  disabled?: boolean
  className?: string
}

const Button: FC<IButton> = ({ title, onClick, disabled, className }) => {
  const styles = className?.includes('bg-') ? '' : 'bg-primary text-secondary'

  return (
    <div className="w-full">
      {/* // Note: A loading state here and maybe a spinner icon would be nice to let the user know that something is happening. */}
      <button
        className={`${className} ${styles} inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 font-semibold shadow-lg transition duration-300 ease-in-out opacity-95 hover:opacity-100 focus:outline-none uppercase`}
        style={{ opacity: disabled ? 0.6 : 1 }}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </div>
  )
}

export default Button
