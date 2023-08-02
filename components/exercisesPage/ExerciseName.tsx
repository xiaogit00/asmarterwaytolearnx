import { Exercise, ExerciseNameProps } from "../../types/topics"
import { useState } from 'react'
import { useRouter } from "next/router"
import { Input } from "antd"
import { updateExercise } from "../../services/exerciseService"
import { useTopicStore } from "../../store"
import Link from 'next/link'

const ExerciseName = ( { exercise, i, activatedExerciseId, setActivatedExerciseId}: ExerciseNameProps): JSX.Element => {
    const [ exerciseName, setExerciseName ] = useState<string>(exercise.name)
    const updateExerciseFromStore = useTopicStore(state => state.updateExercise)
    const router = useRouter()
    const { topicId } = router.query

    
    const handleSaveExercise = async (topidId: string, exerciseId: string, exerciseName: string) => {
        const res = await updateExercise(topidId, exerciseId, exerciseName) 
        updateExerciseFromStore(topidId, exerciseId, exerciseName)
        setActivatedExerciseId(null)
    }
    
    if (activatedExerciseId !== exercise._id) {
        return <h2 className="text-4xl font-semibold">{i + 1}. <Link href={topicId + '/ex/' + exercise._id}>{exercise.name}</Link></h2>
    } else {
        return (
            <Input 
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                onPressEnter={() => handleSaveExercise(topicId as string, exercise._id, exerciseName)}
                onBlur={() => handleSaveExercise(topicId as string, exercise._id as string, exerciseName)}
            />
        )
    }
}

export default ExerciseName