import { useTopicStore } from "../../store"
import TopicName from "./TopicName"
import { useState } from 'react'
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import { Topic } from "../../types/topics"

const TopicItems = (): JSX.Element | null => {
    const topics = useTopicStore(state => state.topics)
    console.log("topics within topicItems:", topics)
    // const [ activeTopicName, setActiveTopicName ] = useState<string>('')
    const [ activatedTopicId, setActivatedTopicId ] = useState<null | string>(null)

    //Renders each row of topics 
    if (topics.length > 0) {
        return (
            <>
            {topics.map((topic: Topic, i: number) => {
                return (
                    <div className="flex justify-between items-center py-2 " key={topic.name}>
                        <h2 className="text-4xl font-semibold"> 
                            <TopicName 
                                topic={topic} 
                                activatedTopicId={activatedTopicId}
                                setActivatedTopicId={setActivatedTopicId}
                                i={i}
                            />
                        </h2>
                        <div className="flex justify-between w-24">
                            <EditButton topic={topic} setActivatedTopicId={setActivatedTopicId}/>
                            <DeleteButton topic={topic}/>
                        </div>
                     </div>
                )
            })}
            </>
        )
    } else {
        return null
    }
}

export default TopicItems
