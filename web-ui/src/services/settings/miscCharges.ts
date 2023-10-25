import request from '@/utils/request';

export const getmisccharges = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/misccharges/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getmisccharge = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/misccharges/list',
    });
    const data = resp?.data?.filter((misccharge: any) => misccharge.id === id);
    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};
