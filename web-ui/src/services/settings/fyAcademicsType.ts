import request from '@/utils/request';

export const getFYAcademicsYears = async () => {
  try {
    const resp = await request({
      method: 'get',
      url: '/settings/fy_academics_type/list',
    });
    return resp.data;
  }
  catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
