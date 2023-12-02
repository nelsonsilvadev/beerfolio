// Note: I really like structured and organized code, so I like to keep things in their own files.
import { IVolume } from './types'

export const volumeOptions = [
  { id: 1, name: 'Liters' },
  { id: 2, name: 'Gallons' },
]

export const errorsState = {
  name: '',
  tagline: '',
  description: '',
  abv: '',
  ibu: '',
  volume: '',
  boilVolume: '',
}

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const validateField = (
  name: string,
  value: string | number | IVolume
) => {
  switch (name) {
    case 'name':
      return !value ? 'Name cannot be empty' : ''
    case 'tagline':
      return !value ? 'Tagline cannot be empty' : ''
    case 'description':
      return !value ? 'Description cannot be empty' : ''
    case 'abv':
      if (typeof value === 'number') {
        return !(value >= 0 && value <= 100)
          ? 'ABV must be between 0 and 100'
          : ''
      }
    case 'ibu':
      if (typeof value === 'number') {
        return value < 0 || value > 150 ? 'IBU must be between 0 and 150' : ''
      }
    default:
      return ''
  }
}
