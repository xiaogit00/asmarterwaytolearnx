import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { MainLayoutProps } from '../types/layouts'
import LoginButton from '../components/LoginButton'
import Link from 'next/link'

export default function MainLayout( { title, children }: MainLayoutProps): JSX.Element {


  return (
    <div className='container mx-auto px-16'>
      <div className='flex h-16 justify-between items-end mb-24'>
        <Link href="/"><HomeOutlined style={{ fontSize: '32px' }}/></Link>
        <LoginButton />
      </div>
      {children}
    </div>
  )
}