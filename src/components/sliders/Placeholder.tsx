import { FC } from 'react'

import Image from 'next/image'

interface IPlaceholder {
  url: string
}

const Placeholder: FC<IPlaceholder> = ({ url }) => (
  <div>
    <label className="block mb-2 font-semibold text-gray-700">Image</label>

    <Image
      className="flex-shrink-0 h-32 w-32 rounded-lg object-scale-down mx-auto select-none"
      src={url}
      alt="Random Beer"
      width={128}
      height={128}
    />

    <p className="mt-5 text-sm italic font-light">
      Psst... the image above is just a placeholder. Image uploads are being
      prepare for a next update. Stay tuned, it's brewing! 🍻
    </p>
  </div>
)

export default Placeholder
