import { Collapse, theme, Select } from 'antd'
import { Question } from '../types/topics'
import { CaretRightOutlined } from '@ant-design/icons';
import { EditFilled } from '@ant-design/icons';
import { useState } from 'react';
import { NewQuestion } from '../types/topics';
import { updateQuestion } from '../services/questionService';
import { useRouter } from 'next/router'
import { useTopicStore } from '../store';
import { DeleteOutlined } from "@ant-design/icons"
import { deleteQuestion } from '../services/questionService';

const { Panel } = Collapse;
const { Option } = Select;

type ExpandIconPosition = 'start' | 'end';

const QuestionList = ({ questions }: { questions: Question[]}) => {
    const router = useRouter()
    const updateQuestionToStore = useTopicStore(state => state.updateQuestion)
    const deleteQuestionFromStore = useTopicStore(state => state.deleteQuestion)
    const { topicId, exerciseId } = router.query
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start')
    const [activeQuestionId, setActiveQuestionId] = useState<null | string>(null)
    // const [questionInput, setQuestionInput] = useState<string>('')
    // const [answerInput, setAnswerInput] = useState<string>('')
    // const [codeInput, setCodeInput] = useState<string>('')
    const [selectedQuestion, setSelectedQuestion] = useState<Question>({question: '', answer: '', code: '', _id: ''})

    const onChange = (key: string | string[]) => {
        console.log(key);
      };
    
    const { token } = theme.useToken();

    const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    }

    const saveHandler = async () => {
        const updatedQuestion: Question = selectedQuestion
        const res = await updateQuestion(String(topicId), String(exerciseId), String(activeQuestionId), updatedQuestion)
        // console.log(res?.status)
        if (res?.status === 200) {
            console.log("Successfully updated the following item into backend:", res.data)
            updateQuestionToStore(String(topicId), String(exerciseId), String(activeQuestionId), res.data)
            setActiveQuestionId(null)
        } else {
            console.log("Didn't manage to update question")
            setActiveQuestionId(null)
        }
    }

    const cancelHandler = () => {
        setActiveQuestionId(null)
    }

    const handleDelete = async (questionId: string) => {
        const res = await deleteQuestion(String(topicId), String(exerciseId), questionId)
        if (res?.status === 204) {
            console.log("Successfully deleted the following question:", questionId)
            deleteQuestionFromStore(String(topicId), String(exerciseId), questionId)
        } else {
            console.log("Didn't manage to delete question.")
        }
        // deleteTopicFromStore(topicId)
    }

    const genExtra = (question: Question) => (
        <EditFilled
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
            setActiveQuestionId(question._id)
            setSelectedQuestion(question)
          }}
        />
      );
    
    return (
        <div className='p-8 m-auto'>
            <Collapse 
                defaultActiveKey={['1']} 
                bordered={false} 
                onChange={onChange}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                expandIconPosition={expandIconPosition}
                style={{ background: token.colorBgContainer }}
            >
                {questions.map(question => {
                    if (activeQuestionId && activeQuestionId === question._id) {
                        return(
                            <div className='p-2 border-slate-100 border-2 rounded-md my-2' key={question._id}>
                                <p className='text-lg my-2'>Question: </p>
                                <Input name='question' defaultValue={question.question} onChange={(e: any) => setSelectedQuestion({...selectedQuestion, question: e.target.value })}/>
                                <p className='text-lg my-2'>Code: </p>
                                <Input name='code' defaultValue={question.code}  onChange={(e: any) => setSelectedQuestion({...selectedQuestion, code: e.target.value })}/>
                                <p className='text-lg my-2'>Answer: </p>
                                <Input name='answer' defaultValue={question.answer}  onChange={(e: any) => setSelectedQuestion({...selectedQuestion, answer: e.target.value })}/>
                                <div className='flex gap-2 w-64 ml-auto mr-0 my-4'>
                                    <Button text="Save" handler={saveHandler}/>
                                    <Button text="Cancel" handler={cancelHandler}/>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <Panel header={question.question} key={question._id} style={panelStyle} extra={genExtra(question)}>
                            <p>Answer: {question.answer}</p>
                            <p>code: {question.code}</p>
                            <div><DeleteOutlined onClick={() => handleDelete(question._id) } className='text-lg cursor-pointer mt-4 text-right'/></div>
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default QuestionList
interface InputProps {
    name: string,
    defaultValue: any,
    onChange: any
}
const Input = ({ name, defaultValue, onChange }: InputProps) => <input defaultValue={defaultValue} name={name} onChange={onChange} className={'bg-gray-5 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}/>
const Button = ({ text, handler }: {text: string, handler: any}) => <button onClick={handler} className="py-2 px-5 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-3xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" >{text}</button>