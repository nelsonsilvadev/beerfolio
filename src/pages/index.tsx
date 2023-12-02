import BeerGrid from '@/components/BeerGrid'
import Button from '@/components/Button'
import FilterOptions from '@/components/FilterOptions'
import Text from '@/components/inputs/Text'
import Layout from '@/components/Layout'
import AddBeer from '@/components/sliders/AddBeer'
import { useBeerContext } from '@/contexts/BeerContext'

import React, { ChangeEvent, useEffect, useState } from 'react'

import Head from 'next/head'

export default function Home() {
  const { beers } = useBeerContext()
  const [open, setOpen] = useState(false)
  const [filteredBeers, setFilteredBeers] = useState(beers)
  const [searchTerm, setSearchTerm] = useState('')
  const [abvRange, setABVRange] = useState({ min: 0, max: 100 })
  const [ibuRange, setIBURange] = useState({ min: 0, max: 150 })
  const [sortCriteria, setSortCriteria] = useState('Name A-Z')
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    applyFilters()
  }, [beers, searchTerm, abvRange, ibuRange, sortCriteria, showFavorites])

  const applyFilters = () => {
    let result = beers

    if (searchTerm) {
      result = result.filter(
        (beer) => beer.name.toLowerCase()?.includes(searchTerm.toLowerCase())
      )
    }

    result = result.filter(
      (beer) => beer.abv >= abvRange.min && beer.abv <= abvRange.max
    )

    result = result.filter(
      (beer) => beer.ibu >= ibuRange.min && beer.ibu <= ibuRange.max
    )

    if (showFavorites) {
      result = result.filter((beer) => beer.verified)
    }

    switch (sortCriteria) {
      case 'Name A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'Name Z-A':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'Most Rated':
        result.sort((a, b) => {
          const ratingA = a.rating ?? 0
          const ratingB = b.rating ?? 0
          return ratingB - ratingA
        })
        break
      case 'Least Rated':
        result.sort((a, b) => {
          const ratingA = a.rating ?? 0
          const ratingB = b.rating ?? 0
          return ratingA - ratingB
        })
        break
      case 'Highest ABV':
        result.sort((a, b) => b.abv - a.abv)
        break
      case 'Lowest ABV':
        result.sort((a, b) => a.abv - b.abv)
        break
      case 'Highest IBU':
        result.sort((a, b) => b.ibu - a.ibu)
        break
      case 'Lowest IBU':
        result.sort((a, b) => a.ibu - b.ibu)
        break
      default:
        break
    }

    setFilteredBeers(result)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleABVChange = (min: number, max: number) => {
    setABVRange({ min, max })
  }

  const handleIBUChange = (min: number, max: number) => {
    setIBURange({ min, max })
  }

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria)
  }

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setABVRange({ min: 0, max: 100 })
    setIBURange({ min: 0, max: 150 })
    setSortCriteria('Name A-Z')
    setShowFavorites(false)
    applyFilters()
  }

  return (
    <>
      <Head>
        <title>BeerFolio</title>
      </Head>

      <Layout>
        <Button
          className="w-full mb-6"
          title="Add a New Brew to Your Portfolio"
          onClick={() => setOpen(true)}
        />

        <Text
          placeholder="Search for one of your beers..."
          onChange={handleSearch}
        />

        <FilterOptions
          onABVChange={handleABVChange}
          onIBUChange={handleIBUChange}
          onSortChange={handleSortChange}
          onToggleFavorites={handleToggleFavorites}
          onClearFilters={handleClearFilters}
          showFavorites={showFavorites}
        />

        <BeerGrid beers={filteredBeers} />
        <AddBeer open={open} setOpen={setOpen} />
      </Layout>
    </>
  )
}
