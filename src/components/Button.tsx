type ButtonProps = {
  label: string
  onClick: () => void
  variant?: 'number' | 'operation' | 'equals' | 'special'
  wide?: boolean
}

function Button ({ label, onClick, variant = 'number', wide }: ButtonProps) {
  const cls = `button button--${variant}${wide ? ' button--wide' : ''}`
  return (
    <button type='button' className={cls} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
