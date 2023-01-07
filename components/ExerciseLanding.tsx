import { Button } from 'antd'

const ExerciseLandingPage = ({ exerciseName }: {exerciseName : string | string[] | undefined}): JSX.Element => {
    return (
        <>
            <p>Alright, are you ready to start your journey with {exerciseName}??</p>
            <Button href={'./' + exerciseName + '/' + 1}> Begin</Button>
        </>
        
    )
}

export default ExerciseLandingPage