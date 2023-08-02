import { useTopicStore } from "../../store"
import { deleteTopic } from "../../services/topicServices"
import { DeleteOutlined } from "@ant-design/icons"
import { Topic } from "../../types/topics"

const DeleteButton = ( {topic}: {topic: Topic} ) => {
    const deleteTopicFromStore = useTopicStore((state) => state.deleteTopic)

    const handleDelete = async (topicId: string) => {
        //call backend service 
        await deleteTopic(topicId)
        deleteTopicFromStore(topicId)

    }

    return (
        <DeleteOutlined onClick={() => handleDelete(topic._id) } style={{fontSize:"30px"}}/>
    )
}

export default DeleteButton