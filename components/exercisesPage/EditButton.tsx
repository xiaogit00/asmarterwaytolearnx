import { EditOutlined } from "@ant-design/icons"


const EditButton = ({exerciseId, topicId, setActivatedExerciseId}: {exerciseId: string, topicId: string, setActivatedExerciseId: React.Dispatch<React.SetStateAction<string | null>>}) => {
    return (
        <EditOutlined onClick={() => setActivatedExerciseId(exerciseId)} style={{fontSize:"30px"}}/>
    )
}

export default EditButton