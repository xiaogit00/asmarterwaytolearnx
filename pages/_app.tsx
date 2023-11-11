'use client'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Script from "next/script"
import MainLayout from '../layouts/MainLayout'
import { useState, useEffect } from 'react'
import { useTopicStore } from '../store'



export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {  
  const fetchTopics = useTopicStore((state) => state.fetchTopics)
  useEffect( () => {
    fetchTopics()
  }, [fetchTopics])
  
  return (
    <>
      <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script strategy="lazyOnload">
          {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                      page_path: window.location.pathname,
                      });
                  `}
        </Script>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </>
    
      
  )}