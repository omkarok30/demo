import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

export default memo(() => (
  <Result
    status='500'
    title='Under Construction'
    subTitle='Please visit later.'
    extra={
      <Link to='/'>
        <Button type='primary'>Back Home</Button>
      </Link>
    }
  />
));
