import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ProgressBar from '../../../../../../components/ProgressBar'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import AnswerInput from '../../../../../../components/AnswerInput';
import { Button, notification } from 'antd'
import { openNotification, filterExerciseQuestions } from '../../../../../../components/exercisePageHelpers';
import Answer from '../../../../../../components/Answer';
import QuestionText from '../../../../../../components/QuestionText';
import { RouterQueryString } from '../../../../../../types/router';
import { useTopicStore } from '../../../../../../store';
import Navigator from '../../../../../../components/Navigator';
const Question = () => {

    const [ answer, setAnswer ] = useState<string>('')
    const [ correct, setCorrect ] = useState< null | boolean >(null)
    const [ numCorrect, setNumCorrect ] = useState<number>(0)
    const [api, contextHolder] = notification.useNotification();
    let lastQuestion: boolean
    let maxQuestions: number


    const router = useRouter()
    const exerciseId: RouterQueryString = router.query.exerciseId
    const topicId: RouterQueryString = router.query.topicId
    const questionNumber: number = Number(router.query.questionId)
  
    const questionNumberMinusOne: number = questionNumber - 1
    
    const topics = useTopicStore(state => state.topics)
    const exerciseQuestions = filterExerciseQuestions(topics, topicId, exerciseId)
    

    const handleAnswerSubmit = () => {
      if (exerciseQuestions && answer === exerciseQuestions[questionNumberMinusOne].answer) {
        openNotification(api, exerciseId, topicId, questionNumber, lastQuestion, numCorrect + 1, maxQuestions)
        setCorrect(true)
        setNumCorrect(numCorrect + 1)
        setAnswer('')
      } else {
        setCorrect(false)
      }
    }

    if (exerciseQuestions) {
      maxQuestions = exerciseQuestions.length
      lastQuestion = questionNumberMinusOne + 1 === maxQuestions

      return (
        <>
        {contextHolder}
            <div className='flex flex-col items-center justify-between gap-y-16 pb-32'>
                <ProgressBar numOfQns={exerciseQuestions.length} current={questionNumberMinusOne}/>
                <QuestionText text={exerciseQuestions[questionNumberMinusOne].question}/>

                {exerciseQuestions[questionNumberMinusOne].code 
                ? (
                  <SyntaxHighlighter language="javascript" style={atomOneDark}>
                    {String(exerciseQuestions[questionNumberMinusOne].code)}
                  </SyntaxHighlighter>
                )
                : null
              }
                

                <AnswerInput 
                placeholder={'Enter Your Answer'}
                value={answer}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {setAnswer(e.currentTarget.value)}}
                onPressEnter={handleAnswerSubmit}
                />

                <Button size={'large'} className='bg-indigo-200 text-white' onClick={handleAnswerSubmit}>
                Check Your Answer
                </Button>
                
                {/* Display answers if incorrect */}
                {correct === false ? 
                  <Answer 
                    text={exerciseQuestions[questionNumberMinusOne].answer} 
                    exerciseId={exerciseId} 
                    topicId={topicId} 
                    questionNumber={questionNumber}
                    setCorrect={setCorrect}
                    setAnswer={setAnswer}
                    numCorrect={numCorrect}
                    lastQuestion={lastQuestion}
                    maxQuestions={maxQuestions}
                  /> 
                
                : null}
            </div>
            <Navigator />
        </>
            
    )
    }
}

export default Question

