import ExerciseName from './ExerciseName'
import EditButton from "./EditButton"
import DeleteButton from "./DeleteButton"
import UploadCSV from "./UploadCSV"
import { Exercise } from "../../types/topics"
import { useState } from 'react'

const ExerciseItems = ({ exercises }: { exercises: Exercise[]}): JSX.Element | null => {
    const [ activatedExerciseId, setActivatedExerciseId ] = useState<null | string>(null)

    if (exercises.length > 0) {
        return (
            <div className='mb-8'>
                {exercises.map((exercise, i) => {
                    return (
                        <div className="flex justify-between items-start py-4 " key={exercise.name}>
                            <div className='flex w-4/5 justify-between items-center'>
                                <ExerciseName exercise={exercise} i={i} activatedExerciseId={activatedExerciseId} setActivatedExerciseId={setActivatedExerciseId}/>
                                <UploadCSV />
                            </div>
                            <div className="flex justify-between w-20 gap-4">
                                <EditButton exerciseId={exercise._id} setActivatedExerciseId={setActivatedExerciseId}/>
                                <DeleteButton exerciseId={exercise._id}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return null
    }
    
}

export default ExerciseItems