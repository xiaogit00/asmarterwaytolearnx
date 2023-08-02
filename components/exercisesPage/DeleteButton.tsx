import { DeleteOutlined } from "@ant-design/icons"
import { deleteExercise } from "../../services/exerciseService"
import { useTopicStore } from "../../store"
import { useRouter } from "next/router"

const DeleteButton = ({ exerciseId}: {exerciseId: string}) => {
    const router = useRouter()
    const topicId = router.query.topicId as string
    console.log("topic and exedrciseId", topicId, exerciseId)
    const deleteExerciseFromStore = useTopicStore(state => state.deleteExercise)
    
    const handleDelete = async (exerciseId: string) => {
        try {
            const res = await deleteExercise(topicId, exerciseId)
            if (res === 204) {
                deleteExerciseFromStore(topicId, exerciseId)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <DeleteOutlined onClick={() => handleDelete(exerciseId)} style={{fontSize:"30px"}}/>
    )
}

export default DeleteButton