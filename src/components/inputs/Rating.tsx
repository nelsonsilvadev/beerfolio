import { StarIcon as FilledStarIcon } from '@heroicons/react/20/solid'
import { StarIcon as EmptyStarIcon } from '@heroicons/react/24/outline'

import { MouseEvent, useState } from 'react'

interface IRating {
  rating: number
  setRating?: (e: MouseEvent, rating: number) => void
  readonly?: boolean
}

const Rating: React.FC<IRating> = ({ rating, setRating, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(null)
    }
  }

  const handleClick = (e: MouseEvent, value: number) => {
    if (!readonly && setRating) {
      setRating(e, value)
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className="p-1"
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={(e: MouseEvent) => handleClick(e, star)}
          aria-label={`Rate ${star} out of 5 stars`}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
          disabled={readonly}
        >
          {star <= (hoverRating || rating) ? (
            <FilledStarIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <EmptyStarIcon className="h-6 w-6 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  )
}

export default Rating
