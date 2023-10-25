import _ from 'lodash';
import { LoginParamsType } from './data.d';

import request, { doDiscovery } from '@/utils/request';
import { useGlobalState } from '@/store/global';

export async function accountLogin(params: LoginParamsType): Promise<any> {
  let main = '';
  const discovery = await doDiscovery();
  main = _.get(discovery, ['data', 'main']);
  useGlobalState.getState().updateDiscovery({ main });

  return request({
    usingMain: true,
    url: '/auth/login',
    method: 'POST',
    data: params,
  });
}
