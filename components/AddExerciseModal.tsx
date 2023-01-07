import React from 'react'
import { FlagOutlined, CloseOutlined } from '@ant-design/icons'
import { Input, Form, Button } from 'antd'

const AddExerciseModal = ( { setIsModalOpen }: {setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {

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
                        >
                        <Form.Item label="Exercise name">
                            <Input placeholder="e.g. Functions" />
                        </Form.Item>
                    </Form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 pt-1 rounded-b">
                  <Button size={'large'} block style={{marginRight:"8px"}} onClick={() => setIsModalOpen(false)}> Close</Button>
                  <Button size={'large'} block type="primary" style={{backgroundColor: "#7F56D9"}}> Confirm</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default AddExerciseModal