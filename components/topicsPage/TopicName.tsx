import { Input } from "antd"
import { useState } from "react"
import { useTopicStore, useTopicIdStore } from "../../store"
import { updateTopicName } from "../../services/topicServices"
import Router from "next/router"
import { TopicNameProps } from '../../types/topics'
import Link from 'next/link'

const TopicName = ({topic, i, activatedTopicId, setActivatedTopicId}: TopicNameProps) => {

    const [ topicName, setTopicName ] = useState<string>(topic.name)
    const updateTopicnameFromStore = useTopicStore((state) => state.updateTopicName)
    const setTopicId = useTopicIdStore((state) => state.setTopicId)

    const handleSaveTopic = async (topicId: string, topicName: string) => {
        const res = await updateTopicName(topicId, topicName) 
        updateTopicnameFromStore(topicId, topicName)
        setActivatedTopicId(null)
    }

    const handleSelectTopic = () => {
        setTopicId(topic._id)
    }
    
    if (activatedTopicId !== topic._id) {
        return  <Link onClick={handleSelectTopic} href={`./${topic.name}`}>{i + 1}. {topic.name}</Link>
    } else {
        return (
            <Input 
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                onPressEnter={() => handleSaveTopic(topic._id, topicName)}
                onBlur={() => handleSaveTopic(topic._id, topicName)}
            />
        )
    }
}

export default TopicName