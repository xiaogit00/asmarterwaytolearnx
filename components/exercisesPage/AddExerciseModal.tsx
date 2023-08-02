import React, { useState } from 'react'
import { FlagOutlined, CloseOutlined } from '@ant-design/icons'
import { Input, Form, Button } from 'antd'
import { addExercise } from '../../services/exerciseService'
import { useTopicStore } from '../../store'
import { useRouter } from 'next/router'


const AddExerciseModal = ( { setIsModalOpen }: {setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {
  const [ newExerciseName, setNewExerciseName ] = useState<string>('')

  const router = useRouter()
  const { topicId } = router.query 

  const addExerciseToStore = useTopicStore(state => state.addExercise)
  const topics = useTopicStore(state => state.topics)

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault
    const res = await addExercise(topicId as string, newExerciseName)
    console.log("res:", res)
    addExerciseToStore(topicId as string, res)
    setNewExerciseName('')
    setIsModalOpen(false)
  }
    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-6 pt-6 rounded-t">
                  <FlagOutlined style={{fontSize:"32px"}}/>
                  <button
                    className="leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <CloseOutlined />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 pb-0 flex-auto">
                  <h1 className="font-sans text-xl font-semibold">Create an Exercise</h1>
                  <p className="text-gray-500 pt-2 pb-4"> Please enter a name for this exercise. </p>
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        >
                        <Form.Item label="Exercise name">
                            <Input 
                              placeholder="e.g. Functions" 
                              value={newExerciseName}
                              onChange={(e) => setNewExerciseName(e.target.value) }
                            />
                        </Form.Item>
                        <div className="flex items-center justify-between p-6 pt-1 rounded-b">
                          <Button size={'large'} block style={{marginRight:"8px"}} onClick={() => setIsModalOpen(false)}> Close</Button>
                          <Form.Item >
                            <Button htmlType="submit" size={'large'} block type="primary" style={{backgroundColor: "#7F56D9"}}> Confirm</Button>
                          </Form.Item>
                        </div>
                    </Form>
                </div>
                {/*footer*/}
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AddExerciseModal