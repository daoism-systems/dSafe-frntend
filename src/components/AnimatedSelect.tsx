import React, { useEffect, useState } from 'react'

import { Button, Label, TextInput } from 'flowbite-react'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string
  setValue: (arg0: string) => void
  options: string[] | Record<string, string | number>[]
  placeholder: string
}

const AnimatedSelect = ({
  value,
  setValue,
  options,
  placeholder,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  //   const [error, setError] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    if (!value) {
      console.log({ value })

      setIsFocused(false)
    }
  }

  return (
    <div className={`relative  ${isFocused || value ? 'focused' : ''}`}>
      <Label
        htmlFor="input"
        className={`absolute left-2 transition-all duration-300 ease-in-out ${
          isFocused || value
            ? 'top-[-12px] text-sm text-gray-700 bg-white px-1'
            : 'top-1/2 -translate-y-1/2 text-gray-400'
        }`}
      >
        {placeholder}
      </Label>
      <select
        id="safeSelect"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className={`w-full text-sm placeholder:text-sm p-4 border  rounded focus:border-gray-700 outline-none`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AnimatedSelect
