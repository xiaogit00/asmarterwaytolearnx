import { Button } from "antd"
import { RouterQueryString } from "../types/router"
import { AnswerProps } from "../types/exercise"
import Link from 'next/link'
import { useRouter } from 'next/router'

const Answer = ( {text, exerciseId, topicId, questionNumber, setCorrect, setAnswer, maxQuestions, numCorrect, lastQuestion}: AnswerProps ) => {
  console.log("State of lastQuestion in Answer:", lastQuestion)
  const router = useRouter()
  const handleClick = () => {
    setCorrect(true)
    setAnswer('')
  }

    return (
      <>
          <h2 className='text-2xl'>Sorry, that’s incorrect. The correct answer is: </h2>
          <h2 className='text-xl font-mono italic'> { text } </h2>
          {lastQuestion 
          ? <Button onClick={() => router.push({
            pathname: `/topic/${topicId}/ex/${exerciseId}/qn/summary`,
            query: {numCorrect, maxQuestions}
          })}> Next</Button>
          : <Link href={`/topic/${topicId}/ex/${exerciseId}/qn/${Number(questionNumber) + 1}`} passHref onClick={handleClick}><Button>Next Exercise</Button></Link>
          }
          
          
      </>
              
    )
  }

export default Answer