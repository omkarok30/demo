import request from '@/utils/request';

export const getfeeheads = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/college_fee_head/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
export const getfeehead = async (id: number) => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/college_fee_head/list',
    });
    const data = resp?.data?.filter((feehead: any) => feehead.id === id);

    return data[0];
  }
  catch (err) {
    console.error(err);
  }
};
