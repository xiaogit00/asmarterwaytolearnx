import { Collapse, theme, Select } from 'antd'
import { Question } from '../types/topics'
import { CaretRightOutlined } from '@ant-design/icons';
import { EditFilled } from '@ant-design/icons';
import { useState } from 'react';

const { Panel } = Collapse;
const { Option } = Select;

type ExpandIconPosition = 'start' | 'end';

const QuestionList = ({ questions }: { questions: Question[]}) => {
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start');
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

    const genExtra = () => (
        <EditFilled
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
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
                    return (
                        <Panel header={question.question} key={question._id} style={panelStyle} extra={genExtra()}>
                            <p>Answer: {question.answer}</p>
                            <p>code: {question.code}</p>
                        </Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default QuestionList