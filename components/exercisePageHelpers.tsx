import { Button, Space } from 'antd'
import { CheckOutlined} from '@ant-design/icons';
import Router from 'next/router';
import { Question } from '../types/topics';
import { Topic } from '../types/topics';
import { RouterQueryString } from '../types/router';
import { NotificationInstance } from 'antd/es/notification/interface';

const openNotification = (api: NotificationInstance, exerciseId: RouterQueryString, topicId: RouterQueryString, questionNumber: number, lastQuestion: Boolean, numCorrect: number, maxQuestions: number) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        {lastQuestion
        ? (<Button onClick={() => Router.push({
          pathname: `/topic/${topicId}/ex/${exerciseId}/qn/summary`,
          query: {numCorrect, maxQuestions}
        })}> Next</Button>)
        : <Button onClick={() => {
            api.destroy()
            Router.push(`/topic/${topicId}/ex/${exerciseId}/qn/${Number(questionNumber) + 1}`)
          }}>
            Ok
          </Button>
        }
        
      </Space>
    );
    api.info({
      message: "Correct Answer",
      placement: 'top',
      btn,
      duration: 10,
      icon: <CheckOutlined />
    });
};

const filterExerciseQuestions = (topicsData: Topic[] | null, topicId: RouterQueryString, exerciseId: RouterQueryString): Question[] | undefined => {
  if (topicsData && topicsData.length > 0 && exerciseId && topicId) {
    const topicData = topicsData.filter(topic => topic._id === topicId)
    const exerciseData = topicData[0].exercises.filter(exercise => exercise._id === exerciseId)
    return exerciseData[0].questions
  } else {
    return undefined
  }
}
  

export { 
    openNotification,
    filterExerciseQuestions
}