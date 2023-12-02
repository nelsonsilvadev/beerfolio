import { useBeerContext } from '@/contexts/BeerContext'
import { IBeer, IBeerInputs, IBeerState, IFormErrors, ISlider } from '@/types'
import { errorsState, validateField } from '@/utils'
import { Dialog, Transition } from '@headlessui/react'

import { FC, Fragment, useEffect, useState } from 'react'

import Actions from './Actions'
import Fields from './Fields'
import Header from './Header'
import OptionalFields from './OptionalFields'
import Placeholder from './Placeholder'

import _ from 'lodash'

const UpdateBeer: FC<ISlider> = ({ beer, open, setOpen }) => {
  const { updateBeer } = useBeerContext()
  const [formState, setFormState] = useState<IBeer | undefined>(beer)
  const [errors, setErrors] = useState(errorsState)

  useEffect(() => {
    return () => debouncedValidation.cancel()
  }, [])

  useEffect(() => {
    if (open) resetForm()
  }, [open])

  const resetForm = () => {
    if (!beer) return
    setFormState({ ...beer })
  }

  const validateAllFields = (): boolean => {
    if (!formState) return false

    const newErrors = Object.keys(formState as IBeerState).reduce(
      (acc: IFormErrors, key) => {
        const value = formState[key as keyof IBeerInputs]

        if (typeof value === 'string' || typeof value === 'number') {
          acc[key as keyof IFormErrors] = validateField(key, value)
        }

        return acc
      },
      {} as IFormErrors
    )

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setFormState((prevState) => {
      if (!prevState) return prevState

      const newValue =
        typeof value === 'number' ? value : parseFloat(value) || 0

      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          value: newValue,
        },
      }
    })
  }

  const handleVolumeUnitChange = (
    name: 'volume' | 'boilVolume',
    option: { id: number; name: string }
  ) => {
    setFormState((prevState) => {
      if (!prevState) return prevState

      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          unit: option.name,
        },
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAllFields()) {
      console.error('Form contains errors')
      return
    }

    console.log(formState)

    updateBeer(formState as unknown as IBeer)
    setOpen(false)
  }

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

  const debouncedValidation = _.debounce((name, value) => {
    const error = validateField(name, value)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }, 400)

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
                        title="Update Beer in Your Collection"
                        description="Fill in the details below and take one step closer to that perfect beer collection you've always dreamed of."
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-5 pb-5 pt-6">
                            {formState && (
                              <>
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
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Actions setOpen={setOpen} label="Update Beer" />
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

export default UpdateBeer
