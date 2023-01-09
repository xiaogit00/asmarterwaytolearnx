import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import React, { useState } from 'react'
import { Button } from "antd"
import AddTopicModal from './AddTopicModal'
import { Topic } from "../types/topics"
import Router from "next/router"
import { deleteTopic, updateTopicName } from "../services/topicServices"
import { useTopicStore } from "../store"
import { Input } from "antd"

const TopicList = ({ topics, setTopicId }: {topics: Topic[], setTopicId}) => {
    
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

    const [ activeTopicName, setActiveTopicName ] = useState<string>('')
    const [ editTopicId, setEditTopicId ] = useState<null | string>(null)

    const deleteTopicFromStore = useTopicStore((state) => state.deleteTopic)
    const updateTopicnameFromStore = useTopicStore((state) => state.updateTopicName)


    const handleDelete = async (topicId: string) => {
        //call backend service 
        const res = await deleteTopic(topicId)
        deleteTopicFromStore(topicId)
        console.log(res)
        // deleteTopic('id')
    }
    const handleSaveTopic = async (topicId: string, topicName: string) => {
        const res = await updateTopicName(topicId, topicName) 
        console.log(res)
        updateTopicnameFromStore(topicId, topicName)
        setEditTopicId(null)
    }

    return (
        <div className='container mx-auto flex flex-col bg-white rounded-md w-3/4 py-16 px-32'>
            {topics.map((topic, i) => {
                return (
                    <div className="flex justify-between items-center py-2 " key={topic.name}>
                        <h2 className="text-4xl font-semibold"> 
                            {(editTopicId && editTopicId === topic._id) ? 
                                (<>
                                    <Input 
                                        value={activeTopicName}
                                        onChange={(e) => setActiveTopicName(e.target.value)}
                                        onPressEnter={() => handleSaveTopic(topic._id, activeTopicName)}
                                        onBlur={() => handleSaveTopic(topic._id, activeTopicName)}
                                    />
                                </>)
                            :(<>{i + 1}. <a href='javascript:;' onClick={() => Router.push({pathname: `./${topic.name}`, query:{topicId: topic._id}}, `./${topic.name}`)}>{topic.name}</a></>)}
                            
                        </h2>
                        <div className="flex justify-between w-24">
                            <EditOutlined style={{fontSize:"30px"}} onClick={() => {
                                setActiveTopicName(topic.name)
                                setEditTopicId(topic._id)
                            }}
                            />
                            <DeleteOutlined onClick={() => handleDelete(topic._id) } style={{fontSize:"30px"}}/>
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