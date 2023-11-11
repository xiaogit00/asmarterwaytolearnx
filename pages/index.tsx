import React from 'react'
import { Inter } from '@next/font/google'
import EmptyContainer from '../components/EmptyContainer'
import TopicList from '../components/topicsPage/TopicList'
import { useTopicStore } from '../store'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const topics = useTopicStore(state => state.topics)
  
  return (
    <>
      <div className='text-center mb-24'>
        <h2 className='font-sans text-4xl font-semibold'>Powercards - make it stick.</h2>
      </div>
      
      {topics.length > 0 ? (<TopicList/>) : <EmptyContainer topic/>}
    </>
  )
}
