import { Button, Space } from 'antd'
import { CheckOutlined} from '@ant-design/icons';
import Router from 'next/router';
import { Question } from '../../../types/topics';
import { Topic } from '../../../types/topics';
import { RouterQueryString } from '../../../types/router';

const openNotification = (api, exerciseName, topicName, questionNumber) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button onClick={() => {
          api.destroy()
          Router.push(`/${topicName}/${exerciseName}/${Number(questionNumber) + 1}`)
        }}>
          Ok
        </Button>
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

const filterExerciseQuestions = (topicsData: Topic[] | null, topicName: RouterQueryString, exerciseName: RouterQueryString): Question[] | undefined => {
  if (topicsData && topicsData.length > 0 && exerciseName && topicName) {
    const topicData = topicsData.filter(topic => topic.name === topicName)
    const exerciseData = topicData[0].exercises.filter(exercise => exercise.name === exerciseName)
    return exerciseData[0].questions
  } else {
    return undefined
  }
}
  

export { 
    openNotification,
    filterExerciseQuestions
}