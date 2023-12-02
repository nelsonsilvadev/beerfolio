import React, { FC } from 'react'

interface ITextarea {
  label?: string
  name?: string
  placeholder?: string
  value?: string
  error?: string
  rows?: number
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<ITextarea> = ({
  label,
  name,
  placeholder,
  value,
  error,
  rows,
  onChange,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor="TODO: camelCase label"
          className="block mb-2 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        className={`w-full p-4 rounded-lg shadow-sm focus:outline-none ${
          error
            ? 'border border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border border-gray-200 focus:border-gray-200 focus:ring-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
      />

      {error && <p className="text-sm text-red-500 mt-1 text-right">{error}</p>}
    </>
  )
}

export default Textarea
