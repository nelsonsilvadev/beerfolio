import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { FC } from 'react'

interface IHeader {
  setOpen: (open: boolean) => void
  title: string
  description: string
}

const Header: FC<IHeader> = ({ setOpen, title, description }) => (
  <div className="bg-primary px-4 py-6 sm:px-6 rounded-ss-lg shadow">
    <div className="flex items-center justify-between">
      <Dialog.Title className="text-xl font-bold text-white">
        {title}
      </Dialog.Title>

      <button
        type="button"
        className="rounded-full p-2 text-gray-500 hover:text-gray-100 ring-0 outline-none focus:outline-none focus:ring-0"
        onClick={() => setOpen(false)}
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <div className="mt-2">
      <p className="text-md text-gray-300">{description}</p>
    </div>
  </div>
)

export default Header
