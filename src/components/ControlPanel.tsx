import { useState } from 'react'
import { Search } from 'lucide-react'

interface ControlPanelProps {
  mainText: string
  subText: string
  onMainTextChange: (text: string) => void
  onSubTextChange: (text: string) => void
  onGifSearch: (searchTerm: string) => void
}

function ControlPanel({
  mainText,
  subText,
  onMainTextChange,
  onSubTextChange,
  onGifSearch
}: ControlPanelProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onGifSearch(searchTerm)
  }

  return (
    <div className="absolute top-4 left-4 bg-white/90 p-4 rounded-lg shadow-lg z-10 backdrop-blur-sm w-72">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Text
          </label>
          <input
            type="text"
            value={mainText}
            onChange={(e) => onMainTextChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Text
          </label>
          <input
            type="text"
            value={subText}
            onChange={(e) => onSubTextChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <form onSubmit={handleSearch} className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search GIF Background
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search GIPHY..."
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ControlPanel
