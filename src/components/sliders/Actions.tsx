import { FC } from 'react'

import Button from '../Button'

interface IActions {
  setOpen: (open: boolean) => void
  label: string
}

const Actions: FC<IActions> = ({ setOpen, label }) => (
  <div className="flex flex-shrink-0 justify-end space-x-3 px-4 py-4 bg-gray-50 rounded-b-lg">
    <Button
      className="w-full bg-white hover:bg-gray-100"
      onClick={() => setOpen(false)}
      title="Cancel"
    />

    <Button className="w-full" title={label} />
  </div>
)

export default Actions
