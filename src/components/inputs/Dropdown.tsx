import { classNames } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { FC, Fragment } from 'react'

interface IDropdownOption {
  id: number
  name: string
}

interface IDropdown {
  options: IDropdownOption[]
  label: string
  className?: string
  selectedOption: IDropdownOption
  onChange: (value: IDropdownOption) => void
}

const Dropdown: FC<IDropdown> = ({
  options,
  label,
  className,
  selectedOption,
  onChange,
}) => {
  return (
    <Listbox value={selectedOption} onChange={onChange}>
      {({ open }) => (
        <div className={className}>
          {label && (
            <label
              htmlFor="TODO: camelCase label"
              className="block mb-2 font-semibold text-gray-700"
            >
              {label}
            </label>
          )}

          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default bg-white pr-10 text-left focus:outline-none sm:text-sm p-4 rounded-lg border border-gray-200 shadow-sm focus:ring-1 focus:border-gray-200 focus:ring-gray-300 text-gray-700">
              <span className="block truncate text-base">
                {selectedOption.name}
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    value={option}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-primary text-secondary' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-secondary' : 'text-gray-900',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}

export default Dropdown
