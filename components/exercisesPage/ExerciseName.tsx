import { Exercise, ExerciseNameProps } from "../../types/topics"
import { useState } from 'react'
import { useRouter } from "next/router"
import { Input } from "antd"
import { updateExercise } from "../../services/exerciseService"
import { useTopicStore } from "../../store"
import Link from 'next/link'

const ExerciseName = ( { exercise,topicId, i, activatedExerciseId, setActivatedExerciseId}: ExerciseNameProps): JSX.Element => {
    const [ exerciseName, setExerciseName ] = useState<string>(exercise.name)
    const updateExerciseFromStore = useTopicStore(state => state.updateExercise)
    const router = useRouter()
    const { topicName } = router.query
    
    const handleSaveExercise = async (topicId: string, exerciseId: string, exerciseName: string) => {
        const res = await updateExercise(topicId, exerciseId, exerciseName) 
        updateExerciseFromStore(topicId, exerciseId, exerciseName)
        setActivatedExerciseId(null)
    }
    
    if (activatedExerciseId !== exercise._id) {
        return <h2 className="text-4xl font-semibold">{i + 1}. <Link href={topicName + '/' + exercise.name}>{exercise.name}</Link></h2>
    } else {
        return (
            <Input 
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                onPressEnter={() => handleSaveExercise(topicId, exercise._id, exerciseName)}
                onBlur={() => handleSaveExercise(topicId, exercise._id, exerciseName)}
            />
        )
    }
    // return (
    //     <h2 className="text-4xl font-semibold">{i + 1}. <a href={topicName + '/' + exercise.name}>{exercise.name}</a></h2>
    // )
}

export default ExerciseName