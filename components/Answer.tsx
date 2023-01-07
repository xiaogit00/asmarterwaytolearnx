import { Button } from "antd"
import { RouterQueryString } from "../types/router"
import { AnswerProps } from "../types/exercise"

const Answer = ( {text, exerciseName, topicName, questionNumber}: AnswerProps ) => {
    return (
      <>
          <h2 className='text-2xl'>Sorry, that’s incorrect. The correct answer is: </h2>
          <h2 className='text-xl font-mono italic'> { text } </h2>
          <Button href={`/${topicName}/${exerciseName}/${Number(questionNumber) + 1}`}>Next Exercise</Button>
      </>
              
    )
  }

export default Answer