import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Question } from '../types/topics'
import { Button } from "antd"
import AddExerciseModal from './AddExerciseModal'
import { useRouter } from 'next/router' 
import { Exercise } from '../types/topics'
const csv=require('csvtojson')
import { addBulkQuestions } from '../services/questionService'

const ExerciseList = ({ exercises, topicId }: { exercises: Exercise[], topicId: string}): JSX.Element => {

    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter()
    const fileReader = new FileReader();

    const topicName = router.query.topicName
    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const elem = e.target as HTMLInputElement
        if (elem.files != null) {
            setFile(elem.files[0]); //error
          }
    };
    console.log(topicId)

    const handleOnSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, exerciseName: string) => {
        e.preventDefault();
        const exerciseId: string = exercises.filter(exercise => exercise.name == exerciseName)[0]._id
        if (file) {
            fileReader.onload = function (event: ProgressEvent<FileReader>) {
                const csvOutput = event.target?.result;
                csv()
                    .fromString(csvOutput)
                    .then((questions: Question[]) => {
                        console.log(questions)
                        addBulkQuestions(topicId, exerciseId, questions)
                    })
            };

            fileReader.readAsText(file);
        }
    }

    return (
        <div className='container mx-auto flex flex-col bg-white rounded-md w-3/4 py-16 px-32'>
            {exercises.map((exercise, i) => {
                return (
                    <div className="flex justify-between items-center py-2 " key={exercise.name}>
                        <h2 className="text-4xl font-semibold">{i + 1}. <a href={topicName + '/' + exercise.name}>{exercise.name}</a></h2>
                        <div className="flex justify-between w-24">
                        <form>
                            <input
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                            />

                            <Button onClick={(e) => {
                                handleOnSubmit(e, exercise.name);
                            }}>
                                IMPORT CSV
                            </Button>
                        </form>
                            <EditOutlined style={{fontSize:"30px"}}/>
                            <DeleteOutlined style={{fontSize:"30px"}}/>
                        </div>
                    </div>
                )

            })}
            <Button className="w-32 self-center" onClick={ () => setIsModalOpen(true)}>New Exercise</Button>
            {isModalOpen ? <AddExerciseModal setIsModalOpen={ setIsModalOpen } /> : null}
        </div>
    )
}

export default ExerciseList