import React, { useState } from 'react'
import { Empty, Button } from 'antd'
import AddTopicModal from './topicsPage/AddTopicModal'
import AddExerciseModal from './exercisesPage/AddExerciseModal'
import { EmptyContainerProps } from '../types/layouts'
import { useSession, signIn } from 'next-auth/react'


const EmptyContainer = ( { topic, exercise, topicId }: EmptyContainerProps): JSX.Element | null => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const { data: session } = useSession()
    // console.log("session:",session)
    const showModal = () => {
        setIsModalOpen(true)
    }
    
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    if (topic) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-64'>
                <Empty description={'No Topics'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                { session ? <Button size={'large'} onClick={ showModal } > Create one now </Button>
                :
                <Button size={'large'} onClick={() => signIn()}> Sign in to create topic </Button>
                }
                
                
                {isModalOpen ? <AddTopicModal setIsModalOpen={ setIsModalOpen }/> : null}
            </div>
            )
    } else if (exercise && topicId) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-64'>
                <Empty description={'No Exercises'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                <Button size={'large'} onClick={ showModal } > Create Exercise </Button>
                
                {isModalOpen ? <AddExerciseModal setIsModalOpen={ setIsModalOpen } topicId={topicId}/> : null}
            </div>
            )
    } else {
        return null
    }
}

export default EmptyContainer