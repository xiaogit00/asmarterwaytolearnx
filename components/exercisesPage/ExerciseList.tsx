import React, { useState } from 'react'
import { Button } from "antd"
import AddExerciseModal from './AddExerciseModal'
import { useRouter } from 'next/router' 
import { Exercise } from '../../types/topics'
import ExerciseItems from './ExerciseItems'

const ExerciseList = ({ exercises, topicId }: { exercises: Exercise[], topicId: string}): JSX.Element => {

    const [ isModalOpen, setIsModalOpen ] = useState(false)

    return (
        <div className='container mx-auto flex flex-col bg-white rounded-md w-3/4 py-16 px-32'>
            <ExerciseItems exercises={exercises} topicId={topicId}/>
            <Button className="w-32 self-center" onClick={ () => setIsModalOpen(true)}>New Exercise</Button>
            {isModalOpen ? <AddExerciseModal setIsModalOpen={ setIsModalOpen } topicId={topicId} /> : null}
        </div>
    )
}

export default ExerciseList