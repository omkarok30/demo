import request from '@/utils/request';

export const getAllSettings = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
