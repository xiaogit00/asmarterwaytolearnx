import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import { Button } from 'antd'
import Link from 'next/link'


const Summary = () => {
  const router = useRouter()
  const exerciseId = router.query.exerciseId
  const topicId = router.query.topicId
  return (
      <>
        <div className='flex flex-col gap-16 items-center'>
          <h2 className='text-4xl font-bold'>End of Exercise</h2>
          <h1 className='text-6xl font-bold'> You got: {router.query.numCorrect}/{router.query.maxQuestions} correct</h1>
          <div className='flex justify-between gap-16'>
            <Link href={`/topic/${topicId}`}><Button block type="primary" style={{backgroundColor: "#7F56D9"}}> Back to topic</Button></Link>
            <Link href={`/topic/${topicId}/ex/${exerciseId}/qn/1`}><Button block type="primary" style={{backgroundColor: "#7F56D9"}}> Redo exercise</Button></Link>
            <Link href={'/'}><Button block type="primary" style={{backgroundColor: "#7F56D9"}}> Back to home</Button></Link>
            
          </div>
        </div>
      </>
          
  )

  }

export default withRouter(Summary)


