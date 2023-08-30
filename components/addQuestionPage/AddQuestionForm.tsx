import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { addQuestion } from '../../services/questionService';
import { useTopicStore } from '../../store';

const AddQuestionForm = () => {
    const router = useRouter()
    const addQuestionToStore = useTopicStore(state => state.addQuestion)
    const { topicId, exerciseId } = router.query
    const onFinish = async (question: any) => {
        console.log('Success:', question);
        //Here, I'll need to input into the DB with the right params. Need to call the backend service. 
        const res = await addQuestion(String(topicId), String(exerciseId), question)
        if (res) {
            addQuestionToStore(String(topicId), String(exerciseId), res)
            router.push({
                pathname: `/topic/${topicId}/ex/${exerciseId}`,
            })
        } else {
            alert("There's an error adding question.")
            router.push({
                pathname: `/topic/${topicId}/ex/${exerciseId}`,
            })
        }
        
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    const { TextArea } = Input;

    return (
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 17 }}
                style={{ maxWidth: 1000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                
            <Form.Item
                label="Question"
                name="question"
                rules={[{ required: true, message: 'Please enter your question here' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Code"
                name="code"
            >
                <TextArea rows={8} placeholder="(Optional) Drop your code here if you need to reference it in your question." />
            </Form.Item>

            <Form.Item
                label="Answer"
                name="answer"
                rules={[{ required: true, message: 'Type your answer to the question here.' }]}
            >
                <Input placeholder="Type your answer to this question, exactly like how you'd like it to be validated."/>
            </Form.Item>

 

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                <Button onClick={() => router.back()}>Cancel</Button>
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddQuestionForm