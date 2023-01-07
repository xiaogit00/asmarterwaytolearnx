export const topics = [
    {
        name: "Typescript",
        exercises: [
            {
                name: "Functions", 
                questions: [
                    {
                        id: 1,
                        question: "In the following code, “Mark” is a string. What is the name (answer with 1 word)?",
                        code: `const sampleFunc = () => {
                            const x = y
                            return y
                        }`, 
                        answer: "variable"
                    }
                ]
            },
            {
                name: "Variables"
            }
        ]
    },
    {
        name: "Javascript", 
        exercises: []
    }
]

export const questions = {
    id: 1,
    topic: 'Typescript',
    exerciseName: 'Functions',
    data: [
        {
            id: 1,
            question: "In the following code, “Mark” is a string. What is the name (answer with 1 word)?",
            code: `const sampleFunc = () => {
                const x = y
                return y
            }`, 
            answer: "variable"
        }
    ]

}