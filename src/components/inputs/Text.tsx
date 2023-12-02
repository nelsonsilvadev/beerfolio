import React, { FC } from 'react'

interface IText {
  label?: string
  name?: string
  placeholder?: string
  value?: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Text: FC<IText> = ({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        name={name}
        className={`w-full p-4 rounded-lg shadow-sm focus:outline-none ${
          error
            ? 'border border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border border-gray-200 focus:border-gray-200 focus:ring-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className="text-sm text-red-500 mt-1 text-right">{error}</p>}
    </div>
  )
}

export default Text
