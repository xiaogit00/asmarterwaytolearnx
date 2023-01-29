import { Input } from "antd"
import { useState } from "react"
import { useTopicStore } from "../../store"
import { updateTopicName } from "../../services/topicServices"
import Router from "next/router"
import { TopicNameProps } from '../../types/topics'

const TopicName = ({topic, i, activatedTopicId, setActivatedTopicId}: TopicNameProps) => {

    const [ topicName, setTopicName ] = useState<string>(topic.name)
    const updateTopicnameFromStore = useTopicStore((state) => state.updateTopicName)

    const handleSaveTopic = async (topicId: string, topicName: string) => {
        const res = await updateTopicName(topicId, topicName) 
        updateTopicnameFromStore(topicId, topicName)
        setActivatedTopicId(null)
    }
    
    if (activatedTopicId !== topic._id) {
        return <a href='javascript:;' onClick={() => Router.push({pathname: `./${topic.name}`, query:{topicId: topic._id}}, `./${topic.name}`)}>{i + 1}. {topic.name}</a>
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