import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input, Tooltip, message } from 'antd';

import { isEmptyValue } from '../../../utils/object';
import { accountLogin } from './service';
import { LoginParamsType, LoginResponseData } from './data.d';
import style from './index.module.less';
import IconSvg from '@/components/IconSvg';

import { removeToken, setToken } from '@/utils/localToken';
import { ResponseData } from '@/utils/request';

const isDev = import.meta.env.MODE === 'development';

const SampleUsers = () => (<div>username/password
  <ul>
    <li>mock:admin@me.localhost/password</li>
    <li>live:admin@me.localhost/select+69</li>
    <li>mock:test@me.localhost/password</li>
    <li>mock:user@me.localhost/password</li>
  </ul>
</div>);

export default memo(() => {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  // Log in
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitLoading(true);
    try {
      const response: ResponseData<LoginResponseData> = await accountLogin(values);
      const { data } = response;
      const accessToken: string = data?.accessToken || '';
      if (isEmptyValue(accessToken)) {
        removeToken();
        throw new Error('Token Error!');
      }
      setToken(accessToken);

      setLoginStatus('ok');
      message.success('Login successful!');
      navigate('/', { replace: true });
    }
    catch (error: any) {
      // if (error.message && error.message === 'CustomError') {
      setLoginStatus('error');
      // }
      message.warning('The validation did not pass, please check the input');
      console.error('error', error);
    }
    setSubmitLoading(false);
  };

  return (
    <div className={style.main}>
      <h1 className={style.title}>{'Account Login'}</h1>
      {isDev ? (<Tooltip color="blue" title={<SampleUsers />}><span>Sample Users</span></Tooltip>) : null}
      <Form name='basic' onFinish={handleSubmit}>
        <Form.Item
          label=''
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
          ]}
        >
          <Input prefix={<IconSvg name='user' />} />
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
            placeholder={'password: `password`'}
            prefix={<IconSvg name='pwd' />}
            autoComplete=''
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' className={style.submit} htmlType='submit' loading={false}>
            {'Sign in'}
          </Button>
          <div className={style['text-align-right']}>
            <Link to='/user/register'>{'or register now!'}</Link>
          </div>
        </Form.Item>

        {loginStatus === 'error' && !submitLoading && (
          <Alert message={'Wrong username or password!'} type='error' showIcon />
        )}
      </Form>
    </div>
  );
});
