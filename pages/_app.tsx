import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Topic } from '../types/topics'
import { useTopicStore } from '../store'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const fetchTopics = useTopicStore((state) => state.fetchTopics)
  

  useEffect( () => {
    fetchTopics()
  }, [fetchTopics])


  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
      
  )}