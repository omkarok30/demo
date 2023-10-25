import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { CurrentUser, useUserState } from '@/store/user';

import PageLoading from '@/components/PageLoading';

import { ResponseData } from '@/utils/request';
import { queryCurrent } from '@/services/user';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { removeToken } from '@/utils/localToken';

export interface SecurityLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: SecurityLayoutProps) => {
  const navigate = useNavigate();
  const user = useUserState((state: any) => state.default);
  const setUser = useUserState((state: any) => state.updateWith);
  const updateDiscovery = useGlobalState((state: any) => state.updateDiscovery);

  const isLogin = useMemo(() => user.id > 0, [user]);

  const getUser = useCallback(async () => {
    try {
      const response: ResponseData<CurrentUser> = await queryCurrent();
      const { data } = response;
      setUser({
        ...user,
        ...data,
      });
      const tenant = data?.tenant;
      if (isEmptyValue(tenant)) {
        removeToken();
        throw new Error('Tenant Error!');
      }
      updateDiscovery({ tenant: data?.tenant });
    }
    catch (error: any) {
      console.error('error', error);
      if (error.message && error.message === 'CustomError') {
        const response = error.response || { data: { code: 10002, msg: '' } };
        const { code, msg } = response.data;
        if (code === 10002) {
          navigate('/user/login', { replace: true });
        }
        else {
          message.error(msg || error);
        }
      }
    }
  }, [user, setUser]);

  useEffect(() => {
    getUser();
  }, []);
  return <>{isLogin ? children : <PageLoading />}</>;
});
