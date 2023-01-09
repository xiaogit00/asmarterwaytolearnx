import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Topic } from '../types/topics'
import { useTopicStore } from '../store'


export default function App({ Component, pageProps }: AppProps) {
  const topicsData = useTopicStore((state) => state.topics)
  const setTopicsData = useTopicStore((state) => state.setTopics)

  const topicsURL: string = 'http://localhost:3000/api/topics'
  

  useEffect( () => {
    axios.get<Topic[]>(topicsURL)
      .then(res => setTopicsData(res.data))
  }, [setTopicsData])


  return (
      <Component {...pageProps} />
  )
}
