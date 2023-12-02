import { IBeer, IBeerResponse } from '@/types'

import React, { createContext, useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { nanoid } from 'nanoid'

interface BeerContextType {
  beers: IBeer[]
  addBeer: (newBeer: IBeer) => void
  updateBeer: (updatedBeer: IBeer) => void
  removeBeer: (beerId: string) => void
  getBeerById: (beerId: string) => IBeer | undefined
}

const BeerContext = createContext<BeerContextType | undefined>(undefined)

export const BeerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [beers, setBeers] = useState<IBeer[]>([])

  useEffect(() => {
    const fetchBeers = async () => {
      const storedBeers = JSON.parse(localStorage.getItem('beers') || '[]')

      if (storedBeers.length === 0) {
        try {
          // Note: I'm using axios here because I'm more familiar with it.
          // But, I think using fetch API would be better since it's already available in the browser.
          const response = await axios.get('https://api.punkapi.com/v2/beers')
          const transformedBeers = response.data.map((beer: IBeerResponse) => ({
            id: nanoid(16),
            name: beer.name,
            tagline: beer.tagline,
            description: beer.description,
            imageUrl: beer.image_url,
            abv: beer.abv,
            ibu: beer.ibu || 0,
            volume: {
              value: beer.volume.value,
              unit: 'Liters',
            },
            boilVolume: {
              value: beer.boil_volume.value,
              unit: 'Liters',
            },
            brewersTips: beer.brewers_tips,
            notes: '',
            verified: false,
          }))

          setBeers(transformedBeers)
          // Note: Just choosed to store the beers in localStorage because it's easy to use.
          // But, I think that using IndexedDB would be better since it's more powerful.
          // I really want to learn more about it.
          localStorage.setItem('beers', JSON.stringify(transformedBeers))
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else {
        setBeers(storedBeers)
      }
    }

    fetchBeers()
  }, [])

  useEffect(() => {
    localStorage.setItem('beers', JSON.stringify(beers))
  }, [beers])

  const addBeer = (newBeer: IBeer) => {
    setBeers((prevBeers) => [...prevBeers, newBeer])
  }

  const updateBeer = (updatedBeer: IBeer) => {
    setBeers((prevBeers) =>
      prevBeers.map((beer) => (beer.id === updatedBeer.id ? updatedBeer : beer))
    )
  }

  const removeBeer = (beerId: string) => {
    setBeers((prevBeers) => prevBeers.filter((beer) => beer.id !== beerId))
  }

  const getBeerById = (beerId: string) => {
    return beers.find((beer) => beer.id === beerId)
  }

  return (
    <BeerContext.Provider
      value={{ beers, addBeer, updateBeer, removeBeer, getBeerById }}
    >
      {children}
    </BeerContext.Provider>
  )
}

export const useBeerContext = () => {
  const context = useContext(BeerContext)

  if (context === undefined) {
    throw new Error('useBeerContext must be used within a BeerProvider')
  }

  return context
}

export default BeerContext
