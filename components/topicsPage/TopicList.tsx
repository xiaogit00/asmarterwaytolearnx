import React, { useState } from 'react'
import { Button } from "antd"
import AddTopicModal from './AddTopicModal'
import { Topic } from "../../types/topics"
import TopicItems from "./TopicItems"

const TopicList = () => {
    
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

    return (
        <div className='container mx-auto flex flex-col bg-white rounded-md w-3/4 py-16 px-32'>
            <TopicItems />
            <Button className="w-32 self-center" onClick={ () => setIsModalOpen(true) }>New Topic</Button>
            {isModalOpen ? <AddTopicModal setIsModalOpen={ setIsModalOpen }/> : null}
        </div>
    )
}

export default TopicList

