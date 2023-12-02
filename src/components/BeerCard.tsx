import { useBeerContext } from '@/contexts/BeerContext'
import { IBeer } from '@/types'
import { ShieldCheckIcon as SolidShieldCheckIcon } from '@heroicons/react/20/solid'
import { ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline'

import React, { FC, MouseEvent } from 'react'

import Rating from './inputs/Rating'

import Image from 'next/image'
import { useRouter } from 'next/router'

interface IBeerCard {
  beer: IBeer
}

const BeerCard: FC<IBeerCard> = ({ beer }) => {
  const router = useRouter()
  const { updateBeer, removeBeer } = useBeerContext()

  const goToBeer = () => {
    router.push(`/beer/${beer.id}`)
  }

  const handleChange = (name: keyof IBeer) => {
    const updatedBeer: IBeer = {
      ...beer,
      [name]: !beer[name],
    }

    if (updatedBeer.id) {
      updateBeer(updatedBeer)
    }
  }

  const handleRatingChange = (e: MouseEvent, rating: number) => {
    e.stopPropagation()

    const updatedBeer = {
      ...beer,
      rating,
    }

    if (updatedBeer.id) {
      updateBeer(updatedBeer)
    }
  }

  const onRemove = () => {
    beer.id && removeBeer(beer.id)
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="cursor-pointer" onClick={goToBeer}>
        <div className="p-4 flex flex-row items-center">
          <div>
            <Image
              className="flex-shrink-0 h-32 w-32 rounded-lg object-scale-down"
              src={beer.imageUrl}
              alt={beer.name}
              width={128}
              height={128}
            />
          </div>

          <div className="ml-4 flex-grow">
            <h3 className="text-lg md:text-xl font-semibold text-black">
              {beer.name}
            </h3>

            <p className="text-gray-500 text-sm md:text-base">{beer.tagline}</p>
            <div className="flex flex-row justify-start items-center mt-2">
              <p className="text-xs md:text-sm text-gray-500 mr-2">
                ABV: {beer.abv}%
              </p>

              <p className="text-xs md:text-sm text-gray-500">
                IBU: {beer.ibu}
              </p>
            </div>

            <div className="-ml-2 mt-3">
              <Rating
                rating={beer.rating}
                setRating={(e: MouseEvent, rating: number) =>
                  handleRatingChange(e as React.MouseEvent, rating)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 bg-gray-50 rounded-b-2xl flex flex-row items-center justify-around">
        <button
          onClick={() => handleChange('verified')}
          aria-label="Toggle Verified"
          className="rounded-full p-2 hover:bg-green-100"
        >
          {beer.verified ? (
            <SolidShieldCheckIcon
              className="h-6 w-6 text-green-500"
              title="Verified"
            />
          ) : (
            <ShieldCheckIcon className="h-6 w-6 text-gray-400" title="Verify" />
          )}
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="rounded-full p-2 hover:bg-red-100"
          title="Remove"
        >
          <TrashIcon className="h-6 w-6 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default BeerCard
