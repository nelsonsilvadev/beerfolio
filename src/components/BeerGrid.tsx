import { IBeer } from '@/types'

import { FC } from 'react'

import BeerCard from './BeerCard'

interface IBeerGrid {
  beers: IBeer[]
}

// Note: Well, pagination would be good feature to have.
// Infinite scrolling is a good option to have for a better user experience.
// However, a load more button would be another good option to have.
const BeerGrid: FC<IBeerGrid> = ({ beers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
      {beers.map((beer) => (
        <BeerCard key={beer.id} beer={beer} />
      ))}
    </div>
  )
}

export default BeerGrid
