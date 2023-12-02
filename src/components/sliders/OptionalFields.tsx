import { IBeerState, IFormErrors } from '@/types'
import { volumeOptions } from '@/utils'

import { ChangeEvent, FC } from 'react'

import Dropdown from '../inputs/Dropdown'
import Number from '../inputs/Number'
import Textarea from '../inputs/Textarea'

interface IOptionalFields {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleCustomChange: (name: string, value: string | number) => void
  handleVolumeChange: (
    name: 'volume' | 'boilVolume',
    value: string | number
  ) => void
  handleVolumeUnitChange: (
    name: 'volume' | 'boilVolume',
    option: { id: number; name: string }
  ) => void
  formState: IBeerState
  errors: IFormErrors
}

const OptionalFields: FC<IOptionalFields> = ({
  handleChange,
  handleVolumeChange,
  handleVolumeUnitChange,
  formState,
  errors,
}) => (
  <>
    <div className="space-y-2 pt-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Optional Fields
      </h3>

      <p className="text-sm text-gray-500">
        These fields are optional and can be filled in later.
      </p>

      <hr className="border-t border-gray-300" />
    </div>

    <div className="flex space-x-4">
      <Number
        label="Volume"
        name="volume"
        onChange={(value) => handleVolumeChange('volume', value)}
        value={formState?.volume.value || 0}
        error={errors.volume}
        allowDecimals
      />

      <Dropdown
        options={volumeOptions}
        label="Unit"
        selectedOption={{
          id: formState?.volume?.unit === 'Liters' ? 1 : 2,
          name: formState?.volume?.unit,
        }}
        onChange={(value) => handleVolumeUnitChange('volume', value)}
        className="w-1/2"
      />
    </div>

    <div className="flex space-x-4">
      <Number
        label="Boil Volume"
        name="boilVolume"
        onChange={(value) => handleVolumeChange('boilVolume', value)}
        value={formState?.boilVolume.value || 0}
        error={errors.boilVolume}
        allowDecimals
      />

      <Dropdown
        options={volumeOptions}
        label="Unit"
        selectedOption={{
          id: formState?.boilVolume?.unit === 'Liters' ? 1 : 2,
          name: formState?.boilVolume?.unit,
        }}
        onChange={(value) => handleVolumeUnitChange('boilVolume', value)}
        className="w-1/2"
      />
    </div>

    <div>
      <Textarea
        label="Brewers Tips"
        name="brewersTips"
        onChange={handleChange}
        value={formState?.brewersTips}
        rows={3}
      />
    </div>

    <div>
      <Textarea
        label="Notes"
        name="notes"
        onChange={handleChange}
        value={formState?.notes}
        rows={3}
      />
    </div>
  </>
)

export default OptionalFields
