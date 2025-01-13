import { useState, useEffect, useRef } from 'react'
import './index.css'
import TextDisplay from './components/TextDisplay'
import ControlPanel from './components/ControlPanel'
import { GiphyFetch } from '@giphy/js-fetch-api'

// Initialize Giphy - using a public beta key. In production, you should use your own API key
const gf = new GiphyFetch('0UTRbFtkMxAplrohufYco5IY74U8hOes')

// Helper function to get random direction between -1 and 1
const getRandomDirection = () => {
  // Ensure we don't get very slow movement by avoiding numbers close to 0
  const value = Math.random() * 2 - 1
  return Math.abs(value) < 0.3 ? value + (value < 0 ? -0.3 : 0.3) : value
}

// Speed multiplier for movement
const SPEED = 1.5

function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [direction, setDirection] = useState({ 
    x: getRandomDirection() * SPEED, 
    y: getRandomDirection() * SPEED
  })
  const [mainText, setMainText] = useState(() => localStorage.getItem('mainText') || 'AWESOME')
  const [subText, setSubText] = useState(() => localStorage.getItem('subText') || 'You did it!')
  const [backgroundGif, setBackgroundGif] = useState('')
  const textRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('mainText', mainText)
    localStorage.setItem('subText', subText)
  }, [mainText, subText])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!textRef.current || !containerRef.current) return

      const textRect = textRef.current.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()

      // Calculate percentages for boundaries
      const textWidthPercent = (textRect.width / containerRect.width) * 100
      const textHeightPercent = (textRect.height / containerRect.height) * 100
      
      setPosition(prev => {
        let newX = prev.x + direction.x
        let newY = prev.y + direction.y

        // Calculate boundaries
        const maxX = 100 - textWidthPercent / 2
        const minX = textWidthPercent / 2
        const maxY = 100 - textHeightPercent / 2
        const minY = textHeightPercent / 2

        // Check for collisions
        let newDirectionX = direction.x
        let newDirectionY = direction.y

        // Horizontal bounds check
        if (newX >= maxX || newX <= minX) {
          newDirectionX = -direction.x
          newX = newX >= maxX ? maxX - 1 : minX + 1 // Move slightly away from edge
        }

        // Vertical bounds check
        if (newY >= maxY || newY <= minY) {
          newDirectionY = -direction.y
          newY = newY >= maxY ? maxY - 1 : minY + 1 // Move slightly away from edge
        }

        // Update direction if there was a collision
        if (newDirectionX !== direction.x || newDirectionY !== direction.y) {
          setDirection({ x: newDirectionX, y: newDirectionY })
        }

        return { x: newX, y: newY }
      })
    }, 16) // ~60fps for smoother animation

    return () => clearInterval(interval)
  }, [direction])

  const handleGifSelect = async (searchTerm: string) => {
    try {
      const { data } = await gf.search(searchTerm, { limit: 1 })
      if (data.length > 0) {
        setBackgroundGif(data[0].images.original.url)
      }
    } catch (error) {
      console.error('Error fetching gif:', error)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-blue-600 relative overflow-hidden"
    >
      {backgroundGif ? (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${backgroundGif})`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat'
          }}
        />
      ) : (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      )}
      <ControlPanel 
        mainText={mainText}
        subText={subText}
        onMainTextChange={setMainText}
        onSubTextChange={setSubText}
        onGifSearch={handleGifSelect}
      />
      <TextDisplay 
        ref={textRef}
        x={position.x} 
        y={position.y} 
        mainText={mainText}
        subText={subText}
      />
    </div>
  )
}

export default App
