export interface Question {
    _id: string,
    question: string,
    code: string | null,
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

export interface TopicNameProps {
    topic: Topic,
    i: number,
    activatedTopicId: string | null,
    setActivatedTopicId: React.Dispatch<React.SetStateAction<string | null>>
}

export interface ExerciseNameProps {
    exercise: Exercise,
    i: number,
    activatedExerciseId: string | null,
    setActivatedExerciseId: React.Dispatch<React.SetStateAction<string | null>>
}

export type NewTopic = Omit<Topic, '_id' | 'toObject'>

export type NewExercise = Omit<Exercise, '_id'>

export type NewQuestion = Omit<Question, '_id'>