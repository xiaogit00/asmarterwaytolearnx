import { EditOutlined } from "@ant-design/icons"
import { Topic } from "../../types/topics"

const EditButton = ({ topic, setActivatedTopicId }: {topic: Topic, setActivatedTopicId: React.Dispatch<React.SetStateAction<string | null>>}) => {
    return (
        <EditOutlined style={{fontSize:"30px"}} onClick={() => {
            setActivatedTopicId(topic._id)
        }}
        />
    )
}

export default EditButton