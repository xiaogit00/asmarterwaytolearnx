import { useState } from 'react'
const csv=require('csvtojson')
import { addBulkQuestions } from '../../services/questionService'
import { Question, Exercise } from '../../types/topics'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useTopicStore } from '../../store';
import { useRouter } from 'next/router';

const UploadCSV = () => {
    const [fileList, setFileList] = useState<any>([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const topicId = router.query.topicId as string
    const exerciseId = router.query.exerciseId as string

    const bulkAddQuestions = useTopicStore(state => state.bulkAddQuestions)
    
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

    const handleOnSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        if (fileList.length > 0) {
            console.log(fileList[0])
            fileReader.onload = function (event: ProgressEvent<FileReader>) {
                const csvOutput = event.target?.result;
                csv()
                    .fromString(csvOutput)
                    .then((questions: Question[]) => {
                        setUploading(true)
                        console.log(questions)
                        addBulkQuestions(topicId, exerciseId, questions)
                        bulkAddQuestions(topicId, exerciseId, questions)

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

            <Upload {...props} maxCount={1}>
                <Button icon={<UploadOutlined />} size={'small'} type={'dashed'}>Upload CSV</Button>
            </Upload>

            {fileList.length>0 ? (<Button
                        onClick={(e: any) => {
                            handleOnSubmit(e);
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