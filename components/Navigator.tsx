import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useRouter } from 'next/router'

const Navigator = () => {
    const router = useRouter()
    return(
        <div className="w-3/4 mx-auto my-4 flex gap-2">
            <div className="">
                <ArrowLeftOutlined style={{fontSize:"56px"}} onClick={() => router.back()}/>
            </div>
        </div>
    )
}

export default Navigator