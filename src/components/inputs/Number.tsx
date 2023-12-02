import { ChangeEvent, FC } from 'react'

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
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    const reg = allowDecimals ? /^\d*\.?\d*$/ : /^\d*$/

    // Note: This is a bit of a hack to allow for a single decimal point and no leading zeros.
    // It's not perfect, but it works for now.
    if (inputValue === '' || reg.test(inputValue)) {
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
        <label className="block mb-2 font-semibold text-gray-700">
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
        onChange={handleChange}
      />

      {error && <p className="text-sm text-red-500 mt-1 text-right">{error}</p>}
    </div>
  )
}

export default Number
