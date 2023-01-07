import { Divider, Steps } from 'antd';

const ProgressBar = (): JSX.Element => {
    return (
      <div className='w-3/4'>
        <Steps
      progressDot
      current={1}
      size="small"
      items={[
        {
          title: '1'
        },
        {
          title: '2'
        },
        {
          title: '3'
        },
        {
            title: '4'
        },
        {
            title: '5'
        },
        {
            title: '6'
        },
        {
            title: '7'
        },
        {
            title: '8'
        },
      ]}
    />
    </div>
    )
}

export default ProgressBar