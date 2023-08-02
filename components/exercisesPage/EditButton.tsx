import { EditOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"


const EditButton = ({ setActivatedExerciseId, exerciseId }: {setActivatedExerciseId: React.Dispatch<React.SetStateAction<string | null>>, exerciseId: string}) => {
    const router = useRouter()
    return (
        <EditOutlined onClick={() => setActivatedExerciseId(exerciseId)} style={{fontSize:"30px"}}/>
    )
}

export default EditButton