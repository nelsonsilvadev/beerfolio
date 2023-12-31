import { useBeerContext } from '@/contexts/BeerContext'
import { IBeerInputs, IBeerState, IFormErrors, ISlider } from '@/types'
import { errorsState, validateField } from '@/utils'
import { Dialog, Transition } from '@headlessui/react'

import {
  ChangeEvent,
  FC,
  Fragment,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import Actions from './Actions'
import Fields from './Fields'
import Header from './Header'
import OptionalFields from './OptionalFields'
import Placeholder from './Placeholder'

import Button from '../Button'

import axios from 'axios'
import _ from 'lodash'
import { nanoid } from 'nanoid'

const initialFormState = {
  // Note: I'm using nanoid here to generate a unique ID for each beer.
  id: nanoid(16),
  name: '',
  tagline: '',
  description: '',
  // Note: I choose this image as the default just because it's the first one that came to mind.
  // I'm not sure if this is the best default image to use.
  imageUrl: 'https://images.punkapi.com/v2/222.png',
  abv: 0,
  ibu: 0,
  volume: { value: 0, unit: 'Liters' },
  boilVolume: { value: 0, unit: 'Liters' },
  brewersTips: '',
  rating: 0,
  notes: '',
  verified: false,
}

const AddBeer: FC<ISlider> = ({ open, setOpen }) => {
  const { addBeer } = useBeerContext()
  const [formState, setFormState] = useState<IBeerState>(initialFormState)
  const [errors, setErrors] = useState(errorsState)

  useEffect(() => {
    if (open) resetForm()
  }, [open])

  const resetForm = () => {
    setFormState({ ...initialFormState, id: nanoid(16) })
  }

  // Note: Getting a random beer from the API just to use it a bit more.
  // Also, this one is awesome to fill the whole form.
  const getRandomBeer = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        'https://api.punkapi.com/v2/beers/random'
      )

      const randomBeer = response.data[0]

      randomBeer.volume.unit = 'Liters'
      randomBeer.boil_volume.unit = 'Liters'

      setFormState({
        id: nanoid(16),
        name: randomBeer.name,
        tagline: randomBeer.tagline,
        description: randomBeer.description,
        imageUrl:
          randomBeer.image_url || 'https://images.punkapi.com/v2/222.png',
        abv: randomBeer.abv,
        ibu: randomBeer.ibu,
        volume: randomBeer.volume,
        boilVolume: randomBeer.boil_volume,
        brewersTips: randomBeer.brewers_tips,
        notes: '',
        rating: 0,
        verified: false,
      })
    } catch (error) {
      console.error('Error fetching random beer:', error)
    }
  }

  const validateAllFields = (): boolean => {
    // Note: This is a bit of a hack to avoid having to create a new interface for the errors.
    // ChatGPT kinda helped me with some of this regarding TypeScript warnings.
    // It was a crazy ride, but I'm glad I got it working.
    const newErrors = Object.keys(formState).reduce((acc: IFormErrors, key) => {
      if (
        typeof formState[key as keyof IBeerInputs] === 'string' ||
        typeof formState[key as keyof IBeerInputs] === 'number'
      ) {
        const value = formState[key as keyof IBeerInputs] as string | number
        acc[key as keyof IFormErrors] = validateField(key, value)
      } else {
        acc[key as keyof IFormErrors] = ''
      }
      return acc
    }, {} as IFormErrors)

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    updateBeerState(name, value)
  }

  const handleCustomChange = (name: string, value: string | number) => {
    updateBeerState(name, value)
  }

  const handleVolumeChange = (
    name: 'volume' | 'boilVolume',
    value: string | number
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: typeof value === 'number' ? value : parseFloat(value),
      },
    }))
  }

  const handleVolumeUnitChange = (
    name: 'volume' | 'boilVolume',
    value: { id: number; name: string }
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        unit: value.name,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAllFields()) {
      console.error('Form contains errors')
      return
    }

    addBeer({ ...formState })
    setOpen(false)
  }

  // Note: With some more time, I could try to join some handlers together.
  // But in another hand, I think it's better to keep them separated for now.
  // Speacilly for readability.
  const updateBeerState = (name: string, value: string | number) => {
    setFormState((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [name]: value,
        }
      }

      return prevState
    })

    debouncedValidation(name, value)
  }

  // Note: Debounce is being used here to avoid unnecessary API calls.
  // I'm using useCallback here to avoid unnecessary re-renders.
  // Re-renders since debounce is a function that is being created on every render.
  const debouncedValidation = useCallback(
    _.debounce((name, value) => {
      const error = validateField(name, value)
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
    }, 400),
    []
  )

  // Note: This is to cancel the debounced function when the component unmounts.
  useEffect(() => {
    return () => debouncedValidation.cancel()
  }, [debouncedValidation])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <Header
                        setOpen={setOpen}
                        title="Add a New Brew to Your Portfolio"
                        description="Fill in the details below and take one step closer to that perfect beer collection you've always dreamed of."
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-5 pb-5 pt-6">
                            <Button
                              className="w-full"
                              title="Get a Random Beer"
                              onClick={getRandomBeer}
                            />

                            <Placeholder url={formState.imageUrl} />

                            <Fields
                              {...{
                                handleChange,
                                handleCustomChange,
                                formState,
                                errors,
                              }}
                            />

                            <OptionalFields
                              {...{
                                handleChange,
                                handleCustomChange,
                                handleVolumeChange,
                                handleVolumeUnitChange,
                                formState,
                                errors,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Actions setOpen={setOpen} label="Add" />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddBeer
