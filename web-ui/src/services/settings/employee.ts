import request from '@/utils/request';

export const getEmployeeDetails = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/employee/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};