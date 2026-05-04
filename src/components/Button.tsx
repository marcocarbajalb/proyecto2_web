type ButtonProps = {
  label: string
  onClick: () => void
  variant?: 'number' | 'operation' | 'equals' | 'special'
}

function Button ({ label, onClick, variant = 'number' }: ButtonProps) {
  return (
    <button
      type='button'
      className={`button button--${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
