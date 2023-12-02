import React, { FC } from 'react'

interface INumber {
  label?: string
  name?: string
  placeholder?: string
  value?: number
  allowDecimals?: boolean
  error?: string
  className?: string
  onChange: (value: number | string) => void
}

const Number: FC<INumber> = ({
  label,
  name,
  placeholder,
  value,
  allowDecimals,
  error,
  className,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Define the regular expression based on whether decimals are allowed
    const reg = allowDecimals ? /^\d*\.?\d*$/ : /^\d*$/

    // Check if the input value is valid according to the regular expression
    if (inputValue === '' || reg.test(inputValue)) {
      // If the input value ends with a dot or is empty, keep it as a string; otherwise, parse as a float
      const parsedValue =
        inputValue.endsWith('.') || inputValue === ''
          ? inputValue
          : parseFloat(inputValue)

      onChange(parsedValue)
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={`id-${label.replace(/\s+/g, '').toLowerCase()}`}
          className="block mb-2 font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        name={name}
        id={`id-${label?.replace(/\s+/g, '').toLowerCase()}`}
        className={`w-full p-4 rounded-lg shadow-sm focus:outline-none ${
          error
            ? 'border border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border border-gray-200 focus:border-gray-200 focus:ring-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {error && <p className="text-sm text-red-500 mt-1 text-right">{error}</p>}
    </div>
  )
}

export default Number
