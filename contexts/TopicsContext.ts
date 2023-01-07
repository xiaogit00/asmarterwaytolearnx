import { createContext } from 'react'
import { Topic } from '../types/topics'

export const TopicsContext = createContext< Topic[] | null>(null)