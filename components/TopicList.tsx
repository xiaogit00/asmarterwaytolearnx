import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import React, { useState } from 'react'
import { Button } from "antd"
import AddTopicModal from './AddTopicModal'
import { Topic } from "../types/topics"
import Router from "next/router"
// import { TopicIdContext } from "../contexts/TopicIdContext"

const TopicList = ({ topics, setTopicId }: {topics: Topic[], setTopicId}) => {
    
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    return (
        <div className='container mx-auto flex flex-col bg-white rounded-md w-3/4 py-16 px-32'>
            {topics.map((topic, i) => {
                return (
                    <div className="flex justify-between items-center py-2 " key={topic.name}>
                        <h2 className="text-4xl font-semibold">{i + 1}. <a href='javascript:;' onClick={() => Router.push({pathname: `./${topic.name}`, query:{topicId: topic._id}}, `./${topic.name}`)}>{topic.name}</a></h2>
                        <div className="flex justify-between w-24">
                            <EditOutlined style={{fontSize:"30px"}}/>
                            <DeleteOutlined style={{fontSize:"30px"}}/>
                        </div>
                    </div>
                )

            })}
            <Button className="w-32 self-center" onClick={ () => setIsModalOpen(true) }>New Topic</Button>
            {isModalOpen ? <AddTopicModal setIsModalOpen={ setIsModalOpen }/> : null}
        </div>
    )
}

export default TopicList