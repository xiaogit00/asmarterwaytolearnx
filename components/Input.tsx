import React from 'react'
import { Input as InputButton } from 'antd' 


const Input = ( { placeholder, value, onChange, onPressEnter } ) => {
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

export default Input