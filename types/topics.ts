export interface Question {
    _id: string,
    question: string,
    code: string,
    answer: string
}

export interface Exercise {
    _id: string,
    name: string,
    questions: Question[]
}

export interface Topic {
    _id: string,
    userId: string,
    name: string,
    exercises: Exercise[],
    toObject(): object
}

export type NewTopic = Omit<Topic, 'id'>

export type NewExercise = Omit<Exercise, 'id'>