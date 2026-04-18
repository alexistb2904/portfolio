import './ShinyText.css'

export default function ShinyText({ text, disabled = false, speed = 5, className = '' }) {
  return (
    <span 
      className={`shiny-text ${className}`}
      style={{
        '--shiny-speed': `${speed}s`,
        opacity: disabled ? 0.5 : 1
      }}
    >
      {text}
    </span>
  )
}