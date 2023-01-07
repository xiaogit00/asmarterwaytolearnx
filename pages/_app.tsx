import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { TopicsContext } from '../contexts/TopicsContext'
import axios from 'axios'
import { Topic } from '../types/topics'

export default function App({ Component, pageProps }: AppProps) {
  const [topicsData, setTopicsData] = useState<Topic[] | null>(null);

  const topicsURL: string = 'http://localhost:3000/api/topics'

  useEffect( () => {
    axios.get<Topic[]>(topicsURL)
      .then(res => setTopicsData(res.data))
  }, [])


  return (
    <TopicsContext.Provider value={topicsData} >
      <Component {...pageProps} />
    </TopicsContext.Provider>
    
  )
}
