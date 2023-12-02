import { IBeerState, IFormErrors } from '@/types'

import { ChangeEvent, FC } from 'react'

import Number from '../inputs/Number'
import Text from '../inputs/Text'
import Textarea from '../inputs/Textarea'

interface IFields {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleCustomChange: (name: string, value: string | number) => void
  formState: IBeerState
  errors: IFormErrors
}

const Fields: FC<IFields> = ({
  handleChange,
  handleCustomChange,
  formState,
  errors,
}) => (
  <>
    <div>
      <Text
        label="Name"
        name="name"
        onChange={handleChange}
        value={formState?.name || ''}
        error={errors.name}
      />
    </div>

    <div>
      <Text
        label="Tagline"
        name="tagline"
        onChange={handleChange}
        value={formState?.tagline || ''}
        error={errors.tagline}
      />
    </div>

    <div>
      <Textarea
        label="Description"
        name="description"
        onChange={handleChange}
        value={formState?.description || ''}
        error={errors.description}
        rows={5}
      />
    </div>

    <div className="flex space-x-4">
      <Number
        label="ABV"
        name="abv"
        onChange={(value) => handleCustomChange('abv', value)}
        value={formState?.abv || 0}
        error={errors.abv}
        allowDecimals
      />

      <Number
        label="IBU"
        name="ibu"
        onChange={(value) => handleCustomChange('ibu', value)}
        value={formState?.ibu || 0}
        error={errors.ibu}
      />
    </div>
  </>
)

export default Fields
