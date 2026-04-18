import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import './BlurText.css'

export default function BlurText({ text, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true)
            anime({
              targets: ref.current,
              opacity: [0, 1],
              filter: ['blur(10px)', 'blur(0px)'],
              translateY: [20, 0],
              easing: 'easeOutExpo',
              duration: 1200,
              delay: delay
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasAnimated, delay])

  return (
    <span ref={ref} className={`blur-text ${className}`} style={{ opacity: 0 }}>
      {text}
    </span>
  )
}