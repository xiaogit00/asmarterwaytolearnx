import { useState } from 'react'
const csv=require('csvtojson')
import { addBulkQuestions } from '../../services/questionService'
import { Question, Exercise } from '../../types/topics'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const UploadCSV = ({ exercise, topicId }: { exercise: Exercise, topicId: string}) => {
    const [fileList, setFileList] = useState<Blob[]>([]);
    const [uploading, setUploading] = useState(false);
    
    const fileReader = new FileReader();

    const props = {
        onRemove: (file: any) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file: any) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        accept: '.csv'
  }

    const handleOnSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, exerciseName: string) => {
        e.preventDefault();
        const exerciseId: string = exercise._id
        console.log(exerciseId)
        if (fileList.length > 0) {
            console.log(fileList[0])
            fileReader.onload = function (event: ProgressEvent<FileReader>) {
                const csvOutput = event.target?.result;
                console.log("thisis reached")
                csv()
                    .fromString(csvOutput)
                    .then((questions: Question[]) => {
                        setUploading(true)
                        console.log(questions)
                        addBulkQuestions(topicId, exerciseId, questions)
                    })
                    .then(() => setFileList([]))
                    .finally(() => {
                        setUploading(false)
                    })
            };

            fileReader.readAsText(fileList[0]);
            
        }
    }

    return (
        <form className='flex'>
            {/* <input
                type={"file"}
                id={"csvFileInput"}
                accept={".csv"}
                onChange={handleOnChange}
            />

            <Button onClick={(e) => {
                handleOnSubmit(e, exercise.name);
            }}>
                Save
            </Button> */}
            <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />} size={'small'} type={'dashed'}>Upload CSV</Button>
            </Upload>

            {fileList.length>0 ? (<Button
                        onClick={(e: any) => {
                            handleOnSubmit(e, exercise.name);
                        }}
                        loading={uploading}
                        type={'link'}
                    >
                        {uploading ? 'Uploading' : 'Save'}
                    </Button>)
                : null
            }
        </form>
)
}

export default UploadCSV