import { RouterQueryString } from "./router"

export interface AnswerProps {
    text: string,
    exerciseId: RouterQueryString,
    topicId: RouterQueryString,
    questionNumber: number,
    setCorrect: React.Dispatch<React.SetStateAction<boolean | null>>
    setAnswer: React.Dispatch<React.SetStateAction<string>>,
    numCorrect: number,
    maxQuestions: number,
    lastQuestion: boolean
}