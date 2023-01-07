import { RouterQueryString } from "./router"

export interface AnswerProps {
    text: string,
    exerciseName: RouterQueryString,
    topicName: RouterQueryString,
    questionNumber: RouterQueryString
}