import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input, message } from 'antd';

import { RegisterParamsType } from './data.d';
import { accountReg } from './service';

import style from './index.module.less';
import IconSvg from '@/components/IconSvg';

export default memo(() => {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  // register
  const handleSubmit = async (values: RegisterParamsType) => {
    setSubmitLoading(true);
    try {
      await accountReg(values);
      setLoginStatus('');
      message.success('Registered successfully, please log in!');
      navigate('/user/login', { replace: true });
    }
    catch (error: any) {
      if (error.message && error.message === 'CustomError') {
        const { response } = error;
        const { data } = response;
        setLoginStatus(data.msg || 'error');
      }
      message.warning('The validation did not pass, please check the input');
      console.error('error', error);
    }
    setSubmitLoading(false);
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>{'Account Registration'}</h1>
      <Form name='basic' onFinish={handleSubmit}>
        <Form.Item
          label=''
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username',
            },
          ]}
        >
          <Input placeholder={'Username'} prefix={<IconSvg name='user' />} />
        </Form.Item>
        <Form.Item
          label=''
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
        >
          <Input.Password
            placeholder={'Password'}
            prefix={<IconSvg name='pwd' />}
            autoComplete=''
          />
        </Form.Item>

        <Form.Item
          label=''
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Password is required',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={'Confirm Password'}
            prefix={<IconSvg name='pwd' />}
            autoComplete=''
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' className={style.submit} htmlType='submit' loading={false}>
            {'Register'}
          </Button>
          <div className={style['text-align-right']}>
            <Link to='/user/login'>{'Already have an account?'}</Link>
          </div>
        </Form.Item>

        {loginStatus !== '' && !submitLoading && <Alert message={loginStatus} type='error' showIcon />}
      </Form>
    </div>
  );
});
