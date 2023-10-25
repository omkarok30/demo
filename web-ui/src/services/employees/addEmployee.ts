import request from '@/utils/request';

export const add = async (data: any) => {
  try {
    const resp = await request({
      method: 'post',
      url: '/employee/create-user',
      data,
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
};