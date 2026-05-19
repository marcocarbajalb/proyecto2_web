type ButtonProps = {
  label: string
  onClick: () => void
  variant?: 'number' | 'operation' | 'equals' | 'special'
  wide?: boolean
  ariaLabel?: string
}

function Button ({ label, onClick, variant = 'number', wide, ariaLabel }: ButtonProps) {
  const cls = `button button--${variant}${wide ? ' button--wide' : ''}`
  return (
    <button type='button' className={cls} onClick={onClick} aria-label={ariaLabel}>
      {label}
    </button>
  )
}

export default Button
