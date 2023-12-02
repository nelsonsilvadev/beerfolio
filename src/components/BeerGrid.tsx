import { IBeer } from '@/types'

import { FC } from 'react'

import BeerCard from './BeerCard'

interface IBeerGrid {
  beers: IBeer[]
}

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
