import Button from '@/components/Button'
import Rating from '@/components/inputs/Rating'
import Layout from '@/components/Layout'
import UpdateBeer from '@/components/sliders/UpdateBeer'
import { useBeerContext } from '@/contexts/BeerContext'
import { IBeer } from '@/types'
import { ShieldCheckIcon as SolidShieldCheckIcon } from '@heroicons/react/20/solid'
import { ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline'

import React, { MouseEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

export default function BeerPage() {
  const router = useRouter()
  const { id } = router.query
  const [beer, setBeer] = useState<IBeer>(null as unknown as IBeer)
  const [open, setOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { updateBeer, removeBeer, getBeerById } = useBeerContext()

  useEffect(() => {
    if (id && !isDeleted) {
      const fetchedBeer = getBeerById(id as string)

      if (fetchedBeer) {
        setBeer(fetchedBeer)
        setIsLoading(false)
      } else {
        router.push('/404')
      }
    }
  }, [id, getBeerById, router])

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

    const updatedBeer: IBeer = {
      ...beer,
      rating,
    }

    if (updatedBeer.id) {
      updateBeer(updatedBeer)
    }
  }

  const onRemove = () => {
    if (beer.id) {
      removeBeer(beer.id)
      setIsDeleted(true)
      router.push('/')
    }
  }

  if (!beer || isLoading) {
    return <Layout>Loading...</Layout>
  }

  return (
    <Layout>
      {beer && (
        <>
          <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <Button
              className="w-full mt-auto p-4 flex flex-row items-center justify-around rounded-b-none"
              onClick={() => setOpen(true)}
              title="Update Beer"
            />

            <div className="p-6 mt-3">
              <div className="flex space-y-3 flex-col">
                <Image
                  className="w-64 h-64 object-scale-down rounded-full mx-auto"
                  src={beer.imageUrl}
                  alt={beer.name}
                  width={256}
                  height={256}
                />

                <h1 className="text-3xl font-bold">{beer.name}</h1>
                <p className="text-xl text-gray-600">{beer.tagline}</p>

                <div className="-ml-1.5">
                  <Rating
                    rating={beer.rating}
                    setRating={(e: MouseEvent, rating: number) =>
                      handleRatingChange(e as MouseEvent, rating)
                    }
                  />
                </div>

                <p className="text-gray-700">{beer.description}</p>

                <div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-700">ABV:</span>{' '}
                    {beer.abv}%
                  </span>

                  <span className="ml-4 text-gray-600">
                    <span className="font-semibold text-gray-700">IBU:</span>{' '}
                    {beer.ibu}
                  </span>
                </div>

                <div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-700">Volume:</span>{' '}
                    {beer.volume.value} {beer.volume.unit}
                  </span>

                  <span className="ml-4 text-gray-600">
                    <span className="font-semibold text-gray-700">
                      Boil Volume:
                    </span>
                    {beer.boilVolume.value} {beer.boilVolume.unit}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Brewers Tips</h3>
                  <p className="text-gray-600">{beer.brewersTips}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Notes</h3>

                  <p className="text-gray-600">
                    {beer.notes.length === 0 ? 'No notes yet' : beer.notes}
                  </p>
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
                  <ShieldCheckIcon
                    className="h-6 w-6 text-gray-400"
                    title="Verify"
                  />
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

          <UpdateBeer beer={beer} open={open} setOpen={setOpen} />
        </>
      )}
    </Layout>
  )
}
