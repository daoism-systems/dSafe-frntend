import React, { useEffect, useState } from 'react'

import { Button, Label, TextInput } from 'flowbite-react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  setValue: (arg0: string) => void
}

const AnimatedInput = ({ value, setValue, placeholder, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false)
    }
  }

  useEffect(() => {
    if (value !== '') {
      const regex = new RegExp(`${props.pattern}`)
      if (!regex.test(value)) {
        setError(true)
      } else {
        setError(false)
      }
    }
  }, [value])

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
      <input
        id={props.id}
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className={`w-full text-sm placeholder:text-sm p-4 border  rounded focus:border-gray-700 outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
        pattern={props.pattern}
      />
    </div>
  )
}

export default AnimatedInput
