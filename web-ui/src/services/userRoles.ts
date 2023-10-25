import request from '@/utils/request';

export const getUserRoles = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/user_roles',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
