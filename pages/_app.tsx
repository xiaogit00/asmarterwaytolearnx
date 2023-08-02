import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import MainLayout from '../layouts/MainLayout'
import { useState, useEffect } from 'react'
import { useTopicStore } from '../store'



export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {  
  const fetchTopics = useTopicStore((state) => state.fetchTopics)
  useEffect( () => {
    fetchTopics()
  }, [fetchTopics])
  
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
      
  )}