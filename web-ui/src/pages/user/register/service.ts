import { RegisterParamsType } from './data.d';
import request from '@/utils/request';

export async function accountReg(params: RegisterParamsType): Promise<any> {
  return request({
    url: '/user/register',
    method: 'POST',
    data: params,
  });
}
