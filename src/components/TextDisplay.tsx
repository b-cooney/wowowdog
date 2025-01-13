import { forwardRef } from 'react'

interface TextDisplayProps {
  x: number
  y: number
  mainText: string
  subText: string
}

const TextDisplay = forwardRef<HTMLDivElement, TextDisplayProps>(
  ({ x, y, mainText, subText }, ref) => {
    return (
      <div 
        ref={ref}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ 
          left: `${x}%`,
          top: `${y}%`,
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg animate-pulse">
          {mainText}
        </h1>
        <p className="text-2xl md:text-3xl text-yellow-300 mt-2 font-semibold">
          {subText}
        </p>
      </div>
    )
  }
)

TextDisplay.displayName = 'TextDisplay'

export default TextDisplay
