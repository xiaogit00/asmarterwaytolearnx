import React from 'react'
import { Input as InputButton } from 'antd' 

interface AnswerInputProps {
    placeholder: string,
    value: string,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    onPressEnter: () => void

}

const AnswerInput = ( { placeholder, value, onChange, onPressEnter }: AnswerInputProps ) => {
    return (
        <>
        <InputButton 
            placeholder={placeholder} 
            className='w-64 shadow-md shadow-indigo-100 border-indigo-500/50 focus:border-indigo-500 hover:border-indigo-500/50 focus:shadow-indigo-200 focus:shadow-md' 
            value={value}
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
        </>
    )
}

export default AnswerInput

