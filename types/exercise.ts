import { RouterQueryString } from "./router"

export interface AnswerProps {
    text: string,
    exerciseName: RouterQueryString,
    topicName: RouterQueryString,
    questionNumber: RouterQueryString
    setCorrect: React.Dispatch<React.SetStateAction<boolean | null>>
    setAnswer: React.Dispatch<React.SetStateAction<string>>,
    numCorrect: number,
    maxQuestions: number,
    lastQuestion: boolean
}