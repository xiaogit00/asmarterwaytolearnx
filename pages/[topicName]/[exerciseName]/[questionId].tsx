import { useRouter } from 'next/router'
import React, { useState, useContext, SyntheticEvent } from 'react'
import ProgressBar from '../../../components/ProgressBar'
import MainLayout from '../../../layouts/MainLayout'
import { questions } from '../../../data/topics';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Input from '../../../components/Input';
import { Button, Space, notification } from 'antd'
import { openNotification, filterExerciseQuestions } from './exercisePageHelpers';
import Answer from '../../../components/Answer';
import QuestionText from '../../../components/QuestionText';
import { TopicsContext } from '../../../contexts/TopicsContext';
import { Question, Topic } from '../../../types/topics';
import { RouterQueryString } from '../../../types/router';

const Question = () => {

    const [ answer, setAnswer ] = useState<string>('')
    const [ correct, setCorrect ] = useState< null | boolean >(null)
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter()
    const exerciseName: RouterQueryString = router.query.exerciseName
    const topicName: RouterQueryString = router.query.topicName
    const questionNumber: RouterQueryString = router.query.questionId
    const topicsData: Topic[] | null = useContext(TopicsContext)
    const exerciseQuestions: Question[] | undefined = filterExerciseQuestions(topicsData, topicName, exerciseName)

    const handleAnswerSubmit = () => {
      if (exerciseQuestions && answer === exerciseQuestions[Number(questionNumber)].answer) {
        openNotification(api, exerciseName, topicName, questionNumber)
        setCorrect(true)
      } else {
        setCorrect(false)
      }
    }

    if (exerciseQuestions) {
      return (
        <MainLayout>
            {contextHolder}
            <div className='flex flex-col items-center justify-between gap-y-16 pb-32'>
                <ProgressBar />
                <QuestionText text={exerciseQuestions[Number(questionNumber)].question}/>

                <SyntaxHighlighter language="javascript" style={atomOneDark}>
                    {exerciseQuestions[Number(questionNumber)].code}
                </SyntaxHighlighter>

                <Input 
                placeholder={'Enter Your Answer'}
                value={answer}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {setAnswer(e.currentTarget.value)}}
                onPressEnter={handleAnswerSubmit}
                />

                <Button size={'large'} className='bg-indigo-200 text-white' onClick={handleAnswerSubmit}>
                Check Your Answer
                </Button>
                
                {/* Display answers if incorrect */}
                {correct === false ? <Answer text={exerciseQuestions[Number(questionNumber)].answer} exerciseName={exerciseName} topicName={topicName} questionNumber={questionNumber}/> : null}
            </div>
        </MainLayout>
    )
    }
}

export default Question

