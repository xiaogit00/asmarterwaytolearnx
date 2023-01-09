import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { MenuOutlined } from '@ant-design/icons'
import EmptyContainer from '../components/EmptyContainer'
import TopicList from '../components/TopicList'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import { useContext } from 'react'
import { TopicsContext } from '../contexts/TopicsContext'
import { Topic } from '../types/topics'
import { useTopicStore } from '../store'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const topicsData = useTopicStore(state => state.topics)

  return (
    <MainLayout title="A Smarter Way to Learn X">
      {topicsData.length > 0 ? (<TopicList topics={topicsData}/>) : <EmptyContainer topic/>}
    </MainLayout>
  )
}
