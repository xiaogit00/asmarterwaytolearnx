import React, { useState } from 'react'
import { Empty, Button } from 'antd'
import AddTopicModal from './topicsPage/AddTopicModal'
import AddExerciseModal from './exercisesPage/AddExerciseModal'
import { EmptyContainerProps } from '../types/layouts'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'



const EmptyContainer = ( { topic, exercise, question }: EmptyContainerProps): JSX.Element | null => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const { data: session } = useSession()
    const router = useRouter()

    const { asPath } = useRouter()
    // console.log("session:",session)
    const showModal = () => {
        setIsModalOpen(true)
    }
    
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    if (topic) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-64'>
                <Empty description={'No Topics'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                { session ? <Button size={'large'} onClick={ showModal } > Create one now </Button>
                :
                <Button size={'large'} onClick={() => signIn()}> Sign in to create topic </Button>
                }
                
                
                {isModalOpen ? <AddTopicModal setIsModalOpen={ setIsModalOpen }/> : null}
            </div>
            )
    } else if (exercise) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-64'>
                <Empty description={'No Exercises'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                <Button size={'large'} onClick={ showModal } > Create Exercise </Button>
                
                {isModalOpen ? <AddExerciseModal setIsModalOpen={ setIsModalOpen }/> : null}
            </div>
            )
    } else if (question) {
        return (
            <div className='container mx-auto flex flex-col items-center bg-white rounded-md w-3/4 py-40'>
                <Empty description={'No Questions'} style={{fontSize:"2em", fontWeight:"500", marginBottom:"8px"}}/>
                <Link href={`${asPath}/qn/add-questions`} passHref ><Button size={'large'} > Create one now </Button></Link>
                
            </div>
        )
    }
    
    else {
        return null
    }
}

export default EmptyContainer