import { FC, useState } from 'react'

import Button from './Button'
import Dropdown from './inputs/Dropdown'
import Number from './inputs/Number'

interface IFilterOptions {
  onABVChange: (min: number, max: number) => void
  onIBUChange: (min: number, max: number) => void
  onSortChange: (criteria: string) => void
  onToggleFavorites: () => void
  onClearFilters: () => void
  showFavorites: boolean
}

const sortOptions = [
  { id: 1, name: 'Name A-Z' },
  { id: 2, name: 'Name Z-A' },
  { id: 7, name: 'Most Rated' },
  { id: 8, name: 'Least Rated' },
  { id: 3, name: 'Highest ABV' },
  { id: 4, name: 'Lowest ABV' },
  { id: 5, name: 'Highest IBU' },
  { id: 6, name: 'Lowest IBU' },
]

const FilterOptions: FC<IFilterOptions> = ({
  onABVChange,
  onIBUChange,
  onSortChange,
  onToggleFavorites,
  onClearFilters,
  showFavorites,
}) => {
  const [abvMin, setABVMin] = useState<number>(0)
  const [abvMax, setABVMax] = useState<number>(100)
  const [ibuMin, setIBUMin] = useState<number>(0)
  const [ibuMax, setIBUMax] = useState<number>(150)
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0])

  const handleABVChange = (minOrMax: 'min' | 'max', value: number) => {
    if (minOrMax === 'min') {
      setABVMin(value)
      onABVChange(value, abvMax)
    } else {
      setABVMax(value)
      onABVChange(abvMin, value)
    }
  }

  const handleIBUChange = (minOrMax: 'min' | 'max', value: number) => {
    if (minOrMax === 'min') {
      setIBUMin(value)
      onIBUChange(value, ibuMax)
    } else {
      setIBUMax(value)
      onIBUChange(ibuMin, value)
    }
  }

  const handleSortChange = (option: { id: number; name: string }) => {
    setSelectedSortOption(option)
    onSortChange(option.name)
  }

  const handleToggleFavorites = () => {
    onToggleFavorites()
  }

  const handleClearFilters = () => {
    setABVMin(0)
    setABVMax(100)
    setIBUMin(0)
    setIBUMax(150)
    setSelectedSortOption(sortOptions[0])
    onClearFilters()
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 my-6">
        <Number
          label="Min ABV"
          name="abvMin"
          placeholder="0"
          value={abvMin}
          onChange={(value) => handleABVChange('min', value as number)}
          allowDecimals
        />

        <Number
          label="Max ABV"
          name="abvMax"
          placeholder="0"
          value={abvMax}
          onChange={(value) => handleABVChange('max', value as number)}
          allowDecimals
        />

        <Number
          label="Min IBU"
          name="ibuMin"
          placeholder="0"
          value={ibuMin}
          onChange={(value) => handleIBUChange('min', value as number)}
        />

        <Number
          label="Max IBU"
          name="ibuMax"
          placeholder="0"
          value={ibuMax}
          onChange={(value) => handleIBUChange('max', value as number)}
        />

        <Dropdown
          label="Sort by"
          options={sortOptions}
          selectedOption={selectedSortOption}
          onChange={handleSortChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
        <Button
          title={!showFavorites ? 'Show Verified Beers Only' : 'Show All Beers'}
          className={`${
            !showFavorites ? 'bg-green-400' : 'bg-red-500'
          } w-full col-span-2 text-white`}
          onClick={() => handleToggleFavorites()}
        />

        <Button
          title="Clear Filters"
          className="w-full col-span-2"
          onClick={handleClearFilters}
        />
      </div>
    </>
  )
}

export default FilterOptions
