import { Collapse, theme} from 'antd'
import { Question } from "../types/topics"
import { EditFilled } from '@ant-design/icons';

const { Panel } = Collapse;

const genExtra = () => (
    <EditFilled
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  

const QuestionPanel = ({question}: {question: Question}) => {

    const { token } = theme.useToken();

    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    }
    return(
        <Panel header={question.question} key={question._id} style={panelStyle} extra={genExtra()}>
            <p>Answer: {question.answer}</p>
            <p>code: {question.code}</p>
        </Panel>
    )
}

export default QuestionPanel 