import { Divider, Steps } from 'antd';

const ProgressBar = ({ numOfQns, current }: {numOfQns: number, current: number}): JSX.Element => {
  //I'll need to construct an array which looks like:
  const numberings = []
  for ( var i = 1; i <= numOfQns; i++) {
    numberings.push({title: i})
  }
    return (
      <div className='w-3/4 text-center'>
        <Steps
          type="inline"
          progressDot
          current={current}
          
          items={numberings}
          responsive
    />
    </div>
    )
}

export default ProgressBar