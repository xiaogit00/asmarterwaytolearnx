import React, { useState } from 'react'
import { Empty, Button } from 'antd'
import AddTopicModal from './AddTopicModal'
import AddExerciseModal from './AddExerciseModal'
import { EmptyContainerProps } from '../types/layouts'


const EmptyContainer = ( { topic, exercise }: EmptyContainerProps): JSX.Element | null => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

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
                <Button size={'large'} onClick={ showModal } > Create one now </Button>
                
                {isModalOpen ? <AddTopicModal setIsModalOpen={ setIsModalOpen }/> : null}
            </div>
            )
    } else if (exercise) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-64'>
                <Empty description={'No Exercises'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                <Button size={'large'} onClick={ showModal } > Create Exercise </Button>
                
                {isModalOpen ? <AddExerciseModal setIsModalOpen={ setIsModalOpen }/> : null}
            </div>
            )
    } else {
        return null
    }
}

export default EmptyContainer