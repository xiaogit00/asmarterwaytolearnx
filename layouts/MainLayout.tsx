import React, { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { MainLayoutProps } from '../types/layouts'

export default function MainLayout( { title, children }: MainLayoutProps): JSX.Element {


  return (
    <div className='container mx-auto px-16'>
      <div className='flex h-16 justify-between items-end mb-8'>
        <MenuOutlined style={{ fontSize: '32px' }}/>
        <p>Breadcrumb</p>
      </div>
      <div className='text-center mb-32'>
        <h2 className='font-sans text-4xl font-semibold'>{title}</h2>
      </div>
      {children}
    </div>
  )
}